import mongoose from 'mongoose';
import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';

export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		console.log(req.user);

		const userID = req.user?.id;
		const User = mongoose.model('User', UserModel.schema);

		const user = await UserModel.findById(userID);
		if (!user) return Resolve(res).notFound('No user foudn by the given ID.');

		const result = await User.findByIdAndDelete(userID);
		Resolve(res).okWith('Account Deleted!');
	},
];
