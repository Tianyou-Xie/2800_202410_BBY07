import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { compareToHashed } from '../../utils/bcrypt';
import { assertRequestBody, Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';
import { JWT } from '../../utils/jwt';

interface PostBody {
	email: string;
	password: string;
}

export const get: Handler[] = [authProtected, async (_, res) => Resolve(res).ok()];

export const post: Handler = async (req, res) => {
	const body = assertRequestBody(
		req,
		res,
		Joi.object<PostBody>({
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().required(),
		}),
	);

	if (!body) return;

	const existingUser = await UserModel.findOne({ email: body.email });
	if (!existingUser) return Resolve(res).forbidden('Invalid credentials provided.');

	const userPassword = existingUser.password;
	if (!userPassword) return Resolve(res).forbidden('Invalid credentials provided.');

	const passwordsMatch = await compareToHashed(body.password, userPassword);
	if (!passwordsMatch) return Resolve(res).forbidden('Invalid credentials provided.');

	Resolve(res).okWith(JWT.signAs(existingUser));
};
