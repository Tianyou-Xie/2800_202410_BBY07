import { Handler } from 'express';
import mongoose from 'mongoose';
import { requireLogin } from '../../../middlewares/require-login';
import { PostModel } from '../../../models/post';
import { Resolve } from '../../../utils/express';

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

		await post.deleteOne();
		Resolve(res).okWith(post, 'Post has been deleted.');
	},
];
