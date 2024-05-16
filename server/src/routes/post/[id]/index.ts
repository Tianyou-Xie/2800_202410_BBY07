import { Handler } from 'express';
import mongoose from 'mongoose';
import { requireLogin } from '../../../middlewares/require-login';
import { PostModel } from '../../../models/post';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';

export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

	const post = await PostModel.findById(id);
	if (!post) return Resolve(res).notFound('Invalid post ID provided.');

	return Resolve(res).okWith(post);
};

export const del: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const loggedInId = req.session.user!.id;
		if (!post.authorId.equals(loggedInId)) return Resolve(res).forbidden('You cannot delete this post.');

		const session = await mongoose.startSession();

		try {
			const deletedPost = await session.withTransaction(async () => {
				await post.deleteOne({ session });
				await UserModel.findByIdAndUpdate(loggedInId, { $inc: { postCount: -1 } }, { session });
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
