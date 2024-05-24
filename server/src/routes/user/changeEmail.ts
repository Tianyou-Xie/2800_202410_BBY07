import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

interface EmailBody {
	currEmail: string;
	newEmail: string;
	confirmEmail: string;
}

export const patch: Handler[] = [
	authProtected,
	async (req, res) => {
		const user = req.user!;

		const emailSchema = Joi.object<EmailBody>({
			currEmail: Joi.string().trim().email().required().equal(user.email).messages({
				'string.base': 'Email must be a string.',
				'string.email': 'The current email entered is not a valid email',
				'any.required': 'Entering the current email is required.',
				'any.only': 'The current email entered does not match.',
			}),
			newEmail: Joi.string().trim().email().required().messages({
				'string.base': 'Email must be a string.',
				'string.email': 'The new email entered is not a valid email',
				'any.required': 'Entering the new email is required.',
			}),
			confirmEmail: Joi.string().trim().email().required().equal(Joi.ref('newEmail')).messages({
				'string.base': 'Email must be a string.',
				'string.email': 'The confirmed email entered is not a valid email',
				'any.required': 'Confirming the email is required.',
				'any.only': 'The confirmed email does not match the new email.',
			})
		});

		const bodyValidationResult = emailSchema.validate(req.body);
		if (bodyValidationResult.error) return Resolve(res).badRequest(bodyValidationResult.error.message);

		const value = bodyValidationResult.value;
		const result = await user.updateOne({ email: value.newEmail });

		return Resolve(res).okWith(result, 'Email changed successfully.');
	},
];
