import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { LikeInteraction } from '../../models/like-interaction';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/liked
 * Fetches paginated liked posts by a user.
 */
export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const user = req.user!;
        const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
        const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
        const limit = 20;
        const skip = (page - 1) * limit;

        const likedPosts = await LikeInteraction.find({ userId: user._id })
            .populate({
                path: 'postId',
                populate: { path: 'authorId', select: 'userName' }
            })
            .skip(skip)
            .limit(limit)
            .lean();

        const formattedLikedPosts = likedPosts.map(like => {
            if (like.postId && (like.postId as any).authorId) {
                return {
                    ...(like.postId as any),
                    userName: (like.postId as any).authorId.userName,
                    isRoot: true
                };
            }
            return null;
        }).filter(post => post !== null);

        return Resolve(res).okWith({ likedPosts: formattedLikedPosts });
    }
];
