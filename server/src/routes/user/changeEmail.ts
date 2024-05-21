import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

interface EmailBody {
	newEmail: string;
	confirmEmail: string;
}

export const patch: Handler[] = [
	authProtected,
	async (req, res) => {
		const user = req.user!;

		const emailSchema = Joi.object<EmailBody>({
			newEmail: Joi.string().trim().email().required(),
			confirmEmail: Joi.string().trim().email().required().equal(Joi.ref('newEmail')),
		});

		const bodyValidationResult = emailSchema.validate(req.body);
		if (bodyValidationResult.error) return Resolve(res).badRequest(bodyValidationResult.error.message);

		const value = bodyValidationResult.value;
		const result = await user.updateOne({ email: value.newEmail });

		return Resolve(res).okWith(result, 'Email changed successfully.');
	},
];
