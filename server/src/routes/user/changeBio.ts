import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

interface bioBody {
	newBio: string;
}

/**
 * PATCH @ /user/changeBio
 *
 * This changes the bio for the user
 * making the request.
 */
export const patch: Handler[] = [
	authProtected,
	async (req, res) => {
		const user = req.user!;
		let currBio;

		if (user.bio) {
			currBio = user.bio;
		} else {
			currBio = '';
		}

		const emailSchema = Joi.object<bioBody>({
			newBio: Joi.string().allow('').trim().required().invalid(currBio).messages({
				'string.base': 'New bio must be a string.',
				'any.required': 'A bio is required in order to change your bio.',
				'any.invalid': 'Bio entered is already your current bio.',
			}),
		});

		const validationResult = emailSchema.validate(req.body);
		if (validationResult.error) return Resolve(res).badRequest(validationResult.error.message);

		const value = validationResult.value;

		const result = await user.updateOne({ bio: value.newBio });
		return Resolve(res).okWith(result, 'Bio changed successfully.');
	},
];
