import { Handler } from 'express';
import { Resolve } from '../../../utils/express';
import { IUser, UserModel } from '../../../models/user';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { escapeRegex } from '../../../utils/regex';

/**
 * GET @ /user/search/:search?page
 *
 * This searches in the database for a user with or that contains the specified string
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

		let userSearch: mongoose.FilterQuery<IUser>;

		const users = await UserModel.exists({ userName: { $regex: search, $options: 'si' } }).lean();

		if (!users) return Resolve(res).notFound('No user or posts found with this search key.');
		else {
			userSearch = { userName: { $regex: escapeRegex(search), $options: 'si' } };
			const searchedUsers = await UserModel.aggregate([
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

			Resolve(res).okWith(searchedUsers);
		}
	},
];
