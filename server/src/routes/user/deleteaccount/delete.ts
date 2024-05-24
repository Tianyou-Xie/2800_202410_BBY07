import mongoose from 'mongoose';
import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';
import Joi from 'joi';
import { DeletedUserModel } from '../../../models/deletedUser';

interface deleteBody {
	confirmationInput: string;
}

const message = 'I-WANT-TO-DELETE-THIS-ACCOUNT';

export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const userID = req.user!.id;
		const User = mongoose.model('User', UserModel.schema);

		const deleteSchema = Joi.object<deleteBody>({
			confirmationInput: Joi.string().uppercase().trim().required().equal(message).messages({
				'string.base': 'The phrase must not contain any numbers or special characters.',
				'string.lowercase': 'The phrase must be typed in uppcase',
				'any.required': 'The identical phrase is required to delete this account.',
				'any.only': 'The phrase entered does not match.',
			}),
		});

		const validationResult = deleteSchema.validate(req.body, { convert: false });
		if (validationResult.error) return Resolve(res).badRequest(validationResult.error.message);

		const result = await User.findByIdAndDelete(userID);
		if (!result) return Resolve(res).notFound('User could not be found.');

		const deletedUser = new DeletedUserModel({
			originID: result._id,
			email: result.email,
			sso: result.sso,
			password: result.password,
			userName: result.userName,
			bio: result.bio,
			location: result.location,
			birthDate: result.birthDate,
			avatarUrl: result.avatarUrl,
			followerCount: result.followerCount,
			followingCount: result.followingCount,
			postCount: result.postCount,
			savedPosts: result.savedPosts,
			admin: result.admin,
			createdAt: result.createdAt
		});
		await deletedUser.save();

		Resolve(res).okWith(result, 'Account deleted successfully.');
	},
];
