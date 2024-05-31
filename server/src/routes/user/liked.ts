import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { LikeInteraction } from '../../models/like-interaction';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/liked
 * Fetches paginated liked posts by a user.
 */
export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const userId = req.user!._id;
        const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
        const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
        const limit = 20;
        const skip = (page - 1) * limit;

        try {
            const likedPostIds = await LikeInteraction.find({ userId }).distinct('postId').lean();

            if (likedPostIds.length === 0) {
                return Resolve(res).okWith({ likedPosts: [] });
            }

            const likedPostsDetails = await PostModel.aggregate([
                { $match: { _id: { $in: likedPostIds }, deleted: false } },
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

            return Resolve(res).okWith({ likedPosts: likedPostsDetails });
        } catch (error) {
            console.error(error);
            return Resolve(res).error('Error fetching liked posts.');
        }
    }
];
