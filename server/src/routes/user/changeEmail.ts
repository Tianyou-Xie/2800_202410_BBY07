import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { requireLogin } from '../../middlewares/require-login';

interface EmailBody {
    newEmail: string,
    confirmEmail: string
}

export const patch: Handler[] = [
    requireLogin,
    async (req, res) => {
        const user = req.user!;

        const emailSchema = Joi.object<EmailBody>({
			newEmail: Joi.string().trim().email().required(),
			confirmEmail: Joi.string().trim().email().required()
		});

        const bodyValidationResult = emailSchema.validate(req.body);
		if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

        const value = bodyValidationResult.value;

        const result = await user.updateOne({ email: value.newEmail });
		return Resolve(res).okWith(result, 'Email changed successfully.');
    }
];