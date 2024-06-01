import mongoose from 'mongoose';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/:id
 *
 * This returns public infromation for the user
 * associated with the given ID>
 */
export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided.');

	const user = await UserModel.findById(id)
		.lean()
		.select('userName bio location avatarUrl followerCount followingCount postCount createdAt deleted');
	if (!user) Resolve(res).notFound('No user found by the given ID.');
	else Resolve(res).okWith(user);
};
