import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { UserModel } from '../../models/user';
import { PostModel } from '../../models/post';
import { authProtected } from '../../middlewares/auth-protected';

/**
 * GET @ /search/:search
 *
 * This searches in the database for a user or a post with or that contains the specified string
 * passed as an url parameter.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const search = req.params.search;
		const users = await UserModel.find({ userName: { $regex: search, $options: 'si' } })
			.lean()
			.select('userName bio location avatarUrl followerCount followingCount postCount createdAt');
		const posts = await PostModel.find({ content: { $regex: search, $options: 'si' } })
			.lean()
			.select('authorId content likeCount commentCount location deleted isRoot media createdAt');
		if ((!users || users.length == 0) && (!posts || posts.length == 0)) {
			Resolve(res).notFound('No user or posts found by the given username.');
		} else
			Resolve(res).okWith({
				users: users,
				posts: posts,
			});
	},
];
