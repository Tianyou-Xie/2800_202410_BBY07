import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { compareToHashed } from '../../utils/bcrypt';
import { setSession } from '../../utils/session';
import { assertRequestBody, Resolve } from '../../utils/express';
import jwt from 'jsonwebtoken'

interface PostBody {
	email: string;
	password: string;
}

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

	res.json({
        success: true,
        _id: existingUser.id,
        name: existingUser.userName,
        email: existingUser.email,
        token: generateToken(existingUser._id)
    })
};

const generateToken = (id:any) => {
    return jwt.sign({ id }, 'abc123', {
        expiresIn: '30d'
    })
}


// export const post: Handler = async (req, res) => {

// }

