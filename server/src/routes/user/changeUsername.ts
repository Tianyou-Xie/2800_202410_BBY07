import Joi from 'joi';
import { Handler } from 'express';
import { Resolve } from '../../utils/express';
import { requireLogin } from '../../middlewares/require-login';

interface UsernameBody {
    newUsername: string
}

export const patch: Handler[] = [
    requireLogin,
    async (req, res) => {
        const user = req.user!;

        const emailSchema = Joi.object<UsernameBody>({
			newUsername: Joi.string().trim().required()
		});

        const bodyValidationResult = emailSchema.validate(req.body);
		if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

        const value = bodyValidationResult.value;

        const result = await user.updateOne({ userName: value.newUsername });
		return Resolve(res).okWith(result, 'Username changed successfully.');
    }
];