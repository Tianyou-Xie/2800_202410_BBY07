import { Handler } from 'express';
import { Resolve } from '../../../utils/express';
import { IPost, PostModel } from '../../../models/post';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { escapeRegex } from '../../../utils/regex';

/**
 * GET @ /post/search/:search?page
 *
 * This searches in the database for a post with or that contains the specified string
 * passed as an url parameter and uses the query page for pagination.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const search = req.params.search.trim();

		const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
		const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
		const limit = 20;
		const skip = (page - 1) * limit;

		let postSearch: mongoose.FilterQuery<IPost>;

		const posts = await PostModel.exists({ content: { $regex: search, $options: 'si' } }).lean();

		if (!posts) return Resolve(res).notFound('No user or posts found with this search key.');
		else {
			postSearch = { content: { $regex: escapeRegex(search), $options: 'si' } };
			const searchedPosts = await PostModel.aggregate([
				{ $match: { ...postSearch, deleted: { $not: { $eq: true } } } },
				{ $sort: { likeCount: -1, commentCount: -1, createdAt: -1 } },
				{ $skip: skip },
				{ $limit: limit },
				{
					$lookup: {
						from: 'users',
						localField: 'authorId',
						foreignField: '_id',
						as: 'author',
					},
				},
				{ $unwind: { path: '$author' } },
				{ $addFields: { userName: '$author.userName' } },
				{ $project: { author: 0 } },
			]);

			Resolve(res).okWith(searchedPosts);
		}
	},
];
