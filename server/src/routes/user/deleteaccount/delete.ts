import mongoose, { deleteModel } from 'mongoose';
import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';
import Joi from 'joi';

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

		Resolve(res).okWith(result, 'Account deleted successfully.');
	},
];
