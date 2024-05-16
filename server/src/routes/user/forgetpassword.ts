import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { TokenModel } from '../../models/token';
import { Resolve } from '../../utils/express';
import crypto from 'crypto';
import {sendEmail} from '../../utils/email';

interface PostBody {
	email: string;
}

export const post: Handler = async (req, res) => {
	const bodySchema = Joi.object<PostBody>({
		email: Joi.string().trim().email().required().messages({
			'string.base': 'The given email must be a string.',
			'string.email': 'The given email is invalid.',
			'any.required': 'Email is required.',
		}),
	});

	const bodyValidationResult = bodySchema.validate(req.body);
	if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });
    
    const { value: body } = bodyValidationResult;

	const existingUser = await UserModel.findOne({ email: body.email });
	if (!existingUser) return Resolve(res).created(post, 'Sorry, no user with that email exists.');

	const resetToken = crypto.randomBytes(32).toString('hex');
	const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	const passwordResetExpires = Date.now() + 10 * 60 * 1000;

	const token = new TokenModel({
		userId: existingUser._id,
		email: body.email,
		passwordResetToken,
		passwordResetExpires: new Date(passwordResetExpires),
	});

	await token.save();

	const resetURL = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`;
	const message = `We have received a request to reset the password for your account.
					\nYou can reset your password using the following link:\n${resetURL}
					\nThe link is only valid for 10 minutes.\nIf you did not make this request, simply ignore this email.`;

	try {
		await sendEmail({
			email: existingUser.email,
			subject: 'Password Reset Request',
			text: message
		});
		Resolve(res).created(post, 'Password rest link has been sent your email.');
	} catch (error) {
		token.deleteOne();
		console.log(error);
		return res.status(500).json({ error: 'There was an error sending the email. Try again later.' });
	}

};