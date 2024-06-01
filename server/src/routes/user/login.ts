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

/**
 * GET @ /user/login
 * 
 * This returns whether a user is currently authorized, and
 * if requested, can issue a new JWT token.
 */
export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		if (!req.user) return Resolve(res).forbidden('Invalid credentials provided.');

		const refreshToken = req.query.token === 'refresh';
		if (refreshToken) Resolve(res).okWith(JWT.signAs(req.user));
		else Resolve(res).ok();
	},
];

/**
 * POST @ /user/login
 * 
 * This authenticates a user based off of specified
 * email and password, and issues a JWT token if
 * all is okay.
 */
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
