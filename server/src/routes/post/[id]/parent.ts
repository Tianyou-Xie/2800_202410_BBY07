import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import { CommentRelationship } from '../../../models/comment-relationship';
import { Resolve } from '../../../utils/express';
import { PostModel } from '../../../models/post';
import mongoose from 'mongoose';
import { UserModel } from '../../../models/user';

export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const rel = await CommentRelationship.findOne({ childPost: id }).lean();
		if (!rel) return Resolve(res).notFound('No comment relationship exists with this post as the child.');

		const parent = await PostModel.findById(rel.parentPost).lean();
		if (!parent) return Resolve(res).error('Invalid post found!');

		const author = await UserModel.findById(parent.authorId).lean();
		if (!author) return Resolve(res).error('Invalid post found!');

		return Resolve(res).okWith({ ...parent, userName: author.userName });
	},
];
