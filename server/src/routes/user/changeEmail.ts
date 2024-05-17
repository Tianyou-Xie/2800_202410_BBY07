import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { requireLogin } from '../../middlewares/require-login';

interface EmailBody {
    email: string,
    confirmEmail: string
}

export const patch: Handler[] = [
    requireLogin,
    async (req, res) => {
        
    }
];