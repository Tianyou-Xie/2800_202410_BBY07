import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../../models/user'; // Import the missing module from the correct file path
import { createHash } from '../../../utils/bcrypt';
import { Resolve } from '../../../utils/express';
import { TokenModel } from '../../../models/token';
import crypto from 'crypto';

interface PostBody {
    password: string;
    confirmpassword: string;
}

export const patch: Handler = async (req, res) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const tokenUser = await TokenModel.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });
    if (!tokenUser) return Resolve(res).created(patch, 'Token is invalid or has expired!');

    const user = await UserModel.findById(tokenUser.userId);
    if (!user) return Resolve(res).created(patch, 'No valid user found. Please try again.');

    const bodySchema = Joi.object<PostBody>({
        password: Joi.string().trim().required().messages({
            'string.base': 'The given password must be a string.',
            'any.required': 'Password is required.',
        }),
        confirmpassword: Joi.string().trim().required().valid(Joi.ref('password')).messages({
            'string.base': 'The given password must be a string.',
            'any.required': 'Confirm password is required.',
            'string.notEqual': 'New passwords do not match.',
        }),
    });

    const bodyValidationResult = bodySchema.validate(req.body);
    if (bodyValidationResult.error) return Resolve(res).created(patch, 'New passwords do not match.');

    const { value: body } = bodyValidationResult;

    await user.updateOne({ password: await createHash(body.password) });

    await tokenUser.deleteOne();

    return Resolve(res).created(patch, 'Password has been reset successfully.');

};