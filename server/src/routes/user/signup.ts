import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { createHash } from '../../utils/bcrypt';

interface Body {
	email: string;
	userName: string;
	password: string;
	location: {
		planetId: string;
		latitude: number;
		longitude: number;
	};
}

export const post: Handler = async (req, res) => {
	const bodySchema = Joi.object<Body>({
		email: Joi.string().trim().email().required(),
		userName: Joi.string().trim().required(),
		password: Joi.string().required(),
		location: Joi.object({
			planetId: Joi.string().trim(),
			latitude: Joi.number().min(0).max(90).required(),
			longitude: Joi.number().min(0).max(90).required(),
		}),
	});

	const bodyValidationResult = bodySchema.validate(req.body);
	if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

	const { value: body } = bodyValidationResult;

	const existingEmail = await UserModel.findOne({ email: body.email });
	if (existingEmail) return res.status(422).json({ error: 'Email is already registered.' });

	const user = new UserModel({
		email: body.email,
		userName: body.userName,
		password: await createHash(body.password),
		location: body.location,
	});

	await user.save();
	req.session.user = { email: user.email, name: user.userName };
};
