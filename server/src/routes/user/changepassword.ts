import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { createHash } from '../../utils/bcrypt';
import { requireLogin } from '../../middlewares/require-login';
import { compareToHashed } from '../../utils/bcrypt';

interface PostBody {
	password: string;
    newpassword: string;
	confirmpassword: string;
}

export const patch: Handler [] = [
    requireLogin,
	async (req, res) => {
		if (!req.session.user) return res.status(401).json({ error: 'You are not logged in.' });

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

		const id = req.session.user.id;
		const user = await UserModel.findById(id);
		if (!user) return res.status(404).json({ error: 'No user found by the given ID.' });

		const passwordsMatch = await compareToHashed(body.password, user.password);
		if (!passwordsMatch) return res.status(401).json({ error: 'Password is incorrect.' });

		await user.updateOne({ password: await createHash(body.newpassword) });
		res.json({ message: 'Password changed successfully.' });
	},
];