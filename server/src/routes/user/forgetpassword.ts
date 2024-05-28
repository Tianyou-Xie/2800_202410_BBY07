import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { TokenModel } from '../../models/token';
import { Resolve } from '../../utils/express';
import crypto from 'crypto';
import { sendEmail } from '../../utils/email';

interface PostBody {
	email: string;
}

/**
 * POST @ /user/forgetpassword
 *
 * This initiates a new password reset token for
 * the specified email address.
 */
export const post: Handler = async (req, res) => {
	const bodySchema = Joi.object<PostBody>({
		email: Joi.string().trim().email().required().messages({
			'string.base': 'The given email must be a string.',
			'string.email': 'The given email is invalid.',
			'any.required': 'Email is required.',
		}),
	});

	const bodyValidationResult = bodySchema.validate(req.body);
	if (bodyValidationResult.error) return Resolve(res).badRequest(bodyValidationResult.error.message);

	const { value: body } = bodyValidationResult;

	const existingUser = await UserModel.findOne({ email: body.email });
	if (!existingUser) return Resolve(res).badRequest('Sorry, no user with that email exists.');

	const submittedEmail = existingUser.email;
	if (!submittedEmail) return Resolve(res).badRequest('Sorry, no user with that email exists.');

	const resetToken = crypto.randomBytes(32).toString('hex');
	const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	const passwordResetExpires = Date.now() + 10 * 60 * 1000;

	const token = new TokenModel({
		userId: existingUser._id,
		email: submittedEmail,
		passwordResetToken,
		passwordResetExpires: new Date(passwordResetExpires),
	});

	await token.save();

	const resetURL = `${req.protocol}://localhost:8000/resetpassword/${resetToken}`;
	const message = `We have received a request to reset the password for your account.
					\nYou can reset your password using the following link:\n${resetURL}
					\nThe link is only valid for 10 minutes.\nIf you did not make this request, simply ignore this email.`;

	try {
		await sendEmail({
			email: submittedEmail,
			subject: 'Password Reset Request',
			text: message,
		});

		return Resolve(res).badRequest('Password rest link has been sent your email.');
	} catch (error) {
		await token.deleteOne();
		console.log(error);
		return Resolve(res).error('There was an error sending the email. Try again later.');
	}
};
