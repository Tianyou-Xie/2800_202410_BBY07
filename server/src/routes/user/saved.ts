import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { UserModel } from '../../models/user';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/saved
 * Fetches the saved posts by a user.
 */
export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const user = req.user!._id;

        const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
        const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
        const limit = 20;
        const skip = (page - 1) * limit;

        try {
            const userDoc = await UserModel.findById(user).select('savedPosts').lean();
            if (!userDoc) return Resolve(res).notFound('User not found.');

            const savedPostsIds = userDoc.savedPosts || [];

            const savedPostsDetails = await PostModel.aggregate([
                { $match: { _id: { $in: savedPostsIds }, deleted: false } },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                { $unwind: { path: '$author' } },
                { $addFields: { userName: '$author.userName', avatarUrl: '$author.avatarUrl' } },
                { $project: { author: 0 } },
            ]);

            return Resolve(res).okWith({ savedPosts: savedPostsDetails });
        } catch (error) {
            console.error(error);
            return Resolve(res).error('Error fetching saved posts.');
        }
    }
];
