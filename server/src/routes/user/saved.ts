import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { UserModel } from '../../models/user';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/saved
 * Fetches the saved posts by a user.
 */
async function getPostDetailsById(id: string) {
    const post = await PostModel.findById(id).lean();
    if (!post) return null;

    const user = await UserModel.findById(post.authorId).select('userName').lean();
    if (!user) return null;

    return {
        ...post,
        userName: user.userName,
    };
}

export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const user = req.user!;

        try {
            const savedPostsIds = await UserModel.findById(user._id).select('savedPosts').lean();
            const savedPostsIdsArray = savedPostsIds?.savedPosts || [];

            const savedPostsDetails = await Promise.all(
                savedPostsIdsArray.map(async (postId) => {
                    return getPostDetailsById(postId as any);
                })
            );

            const filteredSavedPosts = savedPostsDetails.filter(post => post !== null);

            return Resolve(res).okWith({ savedPosts: filteredSavedPosts });
        } catch (error) {
            console.error(error);
            return Resolve(res).error('Error fetching saved posts.');
        }
    }
];