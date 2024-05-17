import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { compareToHashed } from '../../utils/bcrypt';
import { assertRequestBody, Resolve } from '../../utils/express';
import { AuthToken } from '../../utils/auth-token';
import { requireLogin } from '../../middlewares/require-login';

interface PostBody {
	email: string;
	password: string;
}

export const get: Handler[] = [requireLogin, async (_, res) => Resolve(res).ok()];

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

	const passwordsMatch = await compareToHashed(body.password, existingUser.password);
	if (!passwordsMatch) return Resolve(res).unauthorized('Password is incorrect.');

	Resolve(res).okWith(AuthToken.signAs(existingUser));
};
