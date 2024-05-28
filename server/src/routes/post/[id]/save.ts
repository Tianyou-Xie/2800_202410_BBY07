import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { Resolve } from '../../../utils/express';
import { PostModel } from '../../../models/post';

/**
 * GET @ /post/:id/save
 *
 * This returns whether the user making the
 * request has the post associated with the given ID
 * saved.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const user = req.user!;
		Resolve(res).okWith(!!user.savedPosts.find((v) => v.equals(id)));
	},
];

/**
 * POST @ /post/:id/save
 *
 * This saves the post associated with the
 * given ID to the saved posts of the user making the
 * request.
 */
export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const validPost = await PostModel.findById(id);
		if (!validPost) return Resolve(res).notFound('Invalid post ID provided.');

		if (validPost.deleted) return Resolve(res).gone('The given post is deleted.');

		const user = req.user!;
		if (user.savedPosts.includes(validPost._id)) return Resolve(res).conflict('Post is already saved.');

		user.savedPosts.push(validPost._id);
		await user.save();

		Resolve(res).okWith(user.savedPosts);
	},
];

/**
 * DELETE @ /post/:id/save
 *
 * This unsaves the post associated with the
 * given ID for the user making the
 * request.
 */
export const del: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const validPost = await PostModel.exists({ _id: id });
		if (!validPost) return Resolve(res).notFound('Invalid post ID provided.');

		const user = req.user!;
		const index = user.savedPosts.indexOf(validPost._id);
		if (index === -1) return Resolve(res).badRequest('Post is not saved!');

		user.savedPosts.splice(index, 1);
		await user.save();

		Resolve(res).okWith(user.savedPosts);
	},
];
