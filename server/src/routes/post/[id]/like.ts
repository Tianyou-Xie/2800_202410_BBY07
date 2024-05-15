import { Handler } from 'express';
import { requireLogin } from '../../../middlewares/require-login';
import { PostModel } from '../../../models/post';
import mongoose from 'mongoose';
import { Resolve } from '../../../utils/express';
import { LikeInteraction } from '../../../models/like-interaction';

export const get: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const currentUserId = req.session.user!.id;
		const existingInteraction = await LikeInteraction.exists({ postId: id, userId: currentUserId });
		Resolve(res).okWith(existingInteraction);
	},
];

export const post: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const currentUserId = req.session.user!.id;
		const existingInteraction = await LikeInteraction.exists({});
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
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const currentUserId = req.session.user!.id;
		const interaction = await LikeInteraction.findOne({ postId: post._id, userId: currentUserId });
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
			Resolve(res).error('Error occured while trying to like this post.');
		} finally {
			await session.endSession();
		}
	},
];
