import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { IUser, UserModel } from '../../models/user';
import { IPost, PostModel } from '../../models/post';
import { authProtected } from '../../middlewares/auth-protected';
import mongoose from 'mongoose';

/**
 * GET @ /search/:search?page
 *
 * This searches in the database for a user or a post with or that contains the specified string
 * passed as an url parameter and uses the query page for pagination.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const search = req.params.search;

		const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
		const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
		const limit = 20;
		const skip = (page - 1) * limit;

		let userSearch: mongoose.FilterQuery<IUser>;
		let postSearch: mongoose.FilterQuery<IPost>;
		let searchedPosts: any[] = [];
		let searchedUsers: any[] = [];

		const users = await UserModel.exists({ userName: { $regex: search, $options: 'si' } }).lean();
		const posts = await PostModel.exists({ content: { $regex: search, $options: 'si' } }).lean();

		if (!users && !posts) return Resolve(res).notFound('No user or posts found with this search key.');
		if (users) {
			userSearch = { userName: { $regex: search, $options: 'si' } };
			searchedUsers = await UserModel.aggregate([
				{ $match: { ...userSearch } },
				{ $sort: { createdAt: -1 } },
				{ $skip: skip },
				{ $limit: limit },
				{
					$project: {
						userName: 1,
						avatarUrl: 1,
						followerCount: 1,
						followingCount: 1,
						postCount: 1,
					},
				},
			]);
		}
		if (posts) {
			postSearch = { content: { $regex: search, $options: 'si' } };
			searchedPosts = await PostModel.aggregate([
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
		}

		Resolve(res).okWith({
			users: searchedUsers,
			posts: searchedPosts,
		});
	},
];
