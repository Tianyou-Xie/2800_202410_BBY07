import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

interface UsernameBody {
	newUsername: string;
}

/**
 * PATCH @ /user/changeUsername
 *
 * This changes the username for the user
 * making the request.
 */
export const patch: Handler[] = [
	authProtected,
	async (req, res) => {
		const user = req.user!;

		const currUsername = user.userName;

		const emailSchema = Joi.object<UsernameBody>({
			newUsername: Joi.string().trim().required().invalid(currUsername).messages({
				'string.base': 'New username must be a string.',
				'any.required': 'A username is required in order to change your username.',
				'any.invalid': 'Username entered is already the current username.',
			}),
		});

		const validationResult = emailSchema.validate(req.body);
		if (validationResult.error) return Resolve(res).badRequest(validationResult.error.message);

		const value = validationResult.value;

		const result = await user.updateOne({ userName: value.newUsername });
		return Resolve(res).okWith(result, 'Username changed successfully.');
	},
];
