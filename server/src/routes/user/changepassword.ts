import Joi from 'joi';
import { Handler } from 'express';
import { createHash } from '../../utils/bcrypt';
import { compareToHashed } from '../../utils/bcrypt';
import { Resolve } from '../../utils/express';
import { requireLogin } from '../../middlewares/require-login';

interface PostBody {
	password: string;
	newpassword: string;
	confirmpassword: string;
}

export const patch: Handler[] = [
	requireLogin,
	async (req, res) => {
		const user = req.user!;

		const bodySchema = Joi.object<PostBody>({
			password: Joi.string().trim().required().messages({
				'string.base': 'The given password must be a string.',
				'any.required': 'Password is required.',
			}),
			newpassword: Joi.string().trim().required().messages({
				'string.base': 'The given password must be a string.',
				'any.required': 'New password is required.',
			}),
			confirmpassword: Joi.string().trim().required().valid(Joi.ref('newpassword')).messages({
				'string.base': 'The given password must be a string.',
				'any.required': 'Confirm password is required.',
				'any.only': 'New passwords do not match.',
			}),
		});

		const bodyValidationResult = bodySchema.validate(req.body);
		if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

		const { value: body } = bodyValidationResult;

		const passwordsMatch = await compareToHashed(body.password, user.password);
		if (!passwordsMatch) return Resolve(res).created(patch, 'Password is incorrect.');

		await user.updateOne({ password: await createHash(body.newpassword) });
		return Resolve(res).created(patch, 'Password changed successfully.');
	},
];
