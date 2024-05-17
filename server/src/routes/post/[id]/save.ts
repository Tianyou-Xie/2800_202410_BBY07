import { Handler } from 'express';
import { requireLogin } from '../../../middlewares/require-login';
import mongoose from 'mongoose';
import { Resolve } from '../../../utils/express';
import { PostModel } from '../../../models/post';
import { getHydratedUser } from '../../../utils/session';

export const get: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const user = await getHydratedUser(req);
		if (!user) return Resolve(res).error('Unable to save post, user hydration failed.');

		Resolve(res).okWith(!!user.savedPosts.find((v) => v.equals(id)));
	},
];

export const post: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const validPost = await PostModel.exists({ _id: id });
		if (!validPost) return Resolve(res).notFound('Invalid post ID provided.');

		const user = await getHydratedUser(req);
		if (!user) return Resolve(res).error('Unable to save post, user hydration failed.');

		if (user.savedPosts.includes(validPost._id)) return Resolve(res).conflict('Post is already saved.');

		user.savedPosts.push(validPost._id);
		await user.save();

		Resolve(res).okWith(user.savedPosts);
	},
];

export const del: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const validPost = await PostModel.exists({ _id: id });
		if (!validPost) return Resolve(res).notFound('Invalid post ID provided.');

		const user = await getHydratedUser(req);
		if (!user) return Resolve(res).error('Unable to unsave post, user hydration failed.');

		const index = user.savedPosts.indexOf(validPost._id);
		if (index === -1) return Resolve(res).badRequest('Post is not saved!');

		user.savedPosts.splice(index, 1);
		await user.save();

		Resolve(res).okWith(user.savedPosts);
	},
];
