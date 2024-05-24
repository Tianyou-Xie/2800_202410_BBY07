import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import { PostModel } from '../../../models/post';
import mongoose from 'mongoose';
import { Resolve } from '../../../utils/express';
import { LikeInteraction } from '../../../models/like-interaction';

export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const currentUserId = req.user!.id;
		const existingInteraction = await LikeInteraction.findOne({ postId: id, userId: currentUserId });
		if (existingInteraction) Resolve(res).okWith(existingInteraction);
		else Resolve(res).notFound('Post is not liked.');
	},
];

export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		if (post.deleted) return Resolve(res).gone('The given post is deleted.');

		const currentUserId = req.user!._id;
		const existingInteraction = await LikeInteraction.exists({ postId: id, userId: currentUserId }).lean();
		if (existingInteraction) return Resolve(res).badRequest('Post is already liked.');

		const session = await mongoose.startSession();

		try {
			const interaction = await session.withTransaction(async () => {
				const interaction = new LikeInteraction({
					postId: post._id,
					userId: currentUserId,
				});

				await interaction.save({ session });

				post.likeCount++;
				await post.save({ session });

				return interaction;
			});

			Resolve(res).okWith(interaction);
		} catch {
			Resolve(res).error('Error occured while trying to like this post.');
		} finally {
			await session.endSession();
		}
	},
];

export const del: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const currentUserId = req.user!.id;
		const interaction = await LikeInteraction.findOne({ postId: id, userId: currentUserId });
		if (!interaction) return Resolve(res).badRequest('Post is not liked.');

		const session = await mongoose.startSession();

		try {
			await session.withTransaction(async () => {
				await interaction.deleteOne({ session });

				post.likeCount--;
				await post.save({ session });

				return interaction;
			});

			Resolve(res).okWith(interaction);
		} catch {
			Resolve(res).error('Error occured while trying to unlike this post.');
		} finally {
			await session.endSession();
		}
	},
];
