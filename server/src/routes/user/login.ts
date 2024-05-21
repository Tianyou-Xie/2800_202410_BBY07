import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { compareToHashed } from '../../utils/bcrypt';
import { assertRequestBody, Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';

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
	if (!existingUser) return Resolve(res).notFound('No user with that email exists.');

	const hasPassword = 
	const passwordsMatch = await compareToHashed(body.password, existingUser.password);
	if (!passwordsMatch) return Resolve(res).unauthorized('Password is incorrect.');

	Resolve(res).okWith(AuthToken.signAs(existingUser));
};
