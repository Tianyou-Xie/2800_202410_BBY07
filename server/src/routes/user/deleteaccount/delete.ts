import mongoose from 'mongoose';
import { Handler } from 'express';
import { requireLogin } from '../../../middlewares/require-login';
import { Resolve } from '../../../utils/express';
import { UserModel } from '../../../models/user';

export const post: Handler[] = [
    requireLogin,
    async (req, res) => {

        console.log(req.user);
        
        const userID = req.user?.id;
        const User = mongoose.model('User', UserModel.schema);

        const user = await UserModel.findById(userID);
        if (!user) return res.status(404).json({ error: 'No user found by the given ID.' });

        const result = await User.findByIdAndDelete(userID);
        Resolve(res).okWith("Account Deleted!");
    }
];