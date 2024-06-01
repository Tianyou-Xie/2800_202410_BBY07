import { Handler } from 'express';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

/**
 * GET @ /feed
 *
 * This retrieves the feed posts for all combined
 * planets. This utilizes different sorting than the
 * other feeds, because it prioritizes popularity.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const userId = req.user!._id;

		const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
		const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
		const limit = 20;
		const skip = (page - 1) * limit;

		const latestPosts = await PostModel.aggregate([
			{ $match: { parentPost: { $exists: false }, deleted: false } },
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
			{ $addFields: { userName: '$author.userName', avatarUrl: '$author.avatarUrl' } },
			{ $project: { author: 0 } },
		]);

		Resolve(res).okWith(latestPosts);
	},
];
