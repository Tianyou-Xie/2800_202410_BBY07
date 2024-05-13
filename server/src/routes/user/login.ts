import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { compareToHashed } from '../../utils/bcrypt';

interface Body {
	email: string;
	password: string;
}

export const post: Handler = async (req, res) => {
	const bodySchema = Joi.object<Body>({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	});

	const bodyValidationResult = bodySchema.validate(req.body);
	if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

	const { value: body } = bodyValidationResult;

	const existingUser = await UserModel.findOne({ email: body.email });
	if (!existingUser) return res.status(404).json({ error: 'No user with that email exists.' });

	const passwordsMatch = await compareToHashed(body.password, existingUser.password);
	if (!passwordsMatch) return res.status(401).json({ error: 'Password is incorrect.' });

	req.session.user = { email: existingUser.email, name: existingUser.userName };
};
