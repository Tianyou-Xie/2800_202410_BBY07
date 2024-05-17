import mongoose from 'mongoose';
import { Handler } from 'express';
import { requireLogin } from '../../../middlewares/require-login';
import { UserModel } from '../../../models/user';
import { Resolve } from '../../../utils/express';

export const post: Handler[] = [
    requireLogin,
    async (req, res) => {
        const userID = req.session.user?.id;
        const User = mongoose.model('User', UserModel.schema);

        const user = await UserModel.findById(userID);
        if (!user) return res.status(404).json({ error: 'No user found by the given ID.' });

        req.session.destroy((err) => {
            if (err) {
                console.warn(err);
                Resolve(res).error('Failed to destroy session.');
                return;
            }
        });
        const result = await User.findByIdAndDelete(userID);
        Resolve(res).okWith(result, "Account Deleted!");
    }
];
