import { Handler } from 'express';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';

/**
 * GET @ /user/search/:username
 *
 * This searches in the database for a user with or that contains a string passed as url parameter.
 */
export const get: Handler = async (req, res) => {
	const username = req.params.username;
	const user = await UserModel.find({ userName: { $regex: username } })
		.lean()
		.select('_id userName bio location avatarUrl followerCount followingCount postCount createdAt');
	if (!user) Resolve(res).notFound('No user found by the given username.');
	else Resolve(res).okWith(user);
};
