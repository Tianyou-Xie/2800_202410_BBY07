import Joi from 'joi';
import mongoose from 'mongoose';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { requireLogin } from '../../middlewares/require-login';
import { isSessionOf } from '../../utils/session';

export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid user ID provided.' });

	const user = await UserModel.findById(id).lean().select('-admin -email -password');
	res.json(user);
};

interface PatchBody {
	userName?: string;
	email?: string;
	bio?: string;
}

export const patch: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid user ID provided.' });

		const user = await UserModel.findById(id);
		if (!user) return res.status(404).json({ error: 'No user found by the given ID.' });

		if (!isSessionOf(req, user))
			return res.status(401).json({ error: 'You are not authorized to modify this user.' });

		const bodySchema = Joi.object<PatchBody>({
			userName: Joi.string().trim().messages({ 'string.base': 'The given username must be a string.' }),
			email: Joi.string().trim().email().messages({
				'string.base': 'The given email must be a string.',
				'string.email': 'The given email is invalid.',
				'string.empty': 'The given email is invalid.',
			}),
			bio: Joi.string().trim().messages({ 'string.base': 'The given bio must be a string.' }),
		});

		const bodyValidationResult = bodySchema.validate(req.body);
		if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

		const { value: body } = bodyValidationResult;

		if (body.email) {
			const existing = await UserModel.findOne({ email: body.email }).lean();
			if (existing) return res.status(400).json({ error: 'Email already exists.' });
		}

		await user.updateOne(body);
		res.json({ message: 'Properties updated.' });
	},
];
