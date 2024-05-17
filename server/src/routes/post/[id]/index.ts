import { Handler } from 'express';
import mongoose from 'mongoose';
import { requireLogin } from '../../../middlewares/require-login';
import { PostModel } from '../../../models/post';
import { Resolve } from '../../../utils/express';
import { CommentRelationship } from '../../../models/comment-relationship';
import { LikeInteraction } from '../../../models/like-interaction';

export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

	const post = await PostModel.findById(id);
	if (!post) return Resolve(res).notFound('Invalid post ID provided.');

	if (post.deleted) return Resolve(res).gone('Post has been deleted.');
	return Resolve(res).okWith(post);
};

export const del: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const currentUser = req.user!;
		if (!post.authorId.equals(currentUser._id)) return Resolve(res).forbidden('You cannot delete this post.');

		if (post.deleted) return Resolve(res).gone('Post is already deleted.');

		const session = await mongoose.startSession();

		try {
			const deletedPost = await session.withTransaction(async () => {
				await post.updateOne({ deleted: true, content: '', likeCount: 0 }, { session });
				await currentUser.updateOne({ $inc: { postCount: -1 } }, { session });

				const commentOfRelationship = await CommentRelationship.findOne({ childPost: post._id });
				if (commentOfRelationship) {
					await commentOfRelationship.deleteOne({ session });
					await PostModel.updateOne(
						{ _id: commentOfRelationship.parentPost },
						{ $inc: { commentCount: -1 } },
						{ session },
					);
				}

				await LikeInteraction.deleteMany({ postId: post._id }, { session });

				return post;
			});

			Resolve(res).okWith(deletedPost, 'Post has been deleted.');
		} catch {
			Resolve(res).error('Error occured while trying to delete this post.');
		} finally {
			session.endSession();
		}
	},
];
