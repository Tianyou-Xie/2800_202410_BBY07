import { Handler } from 'express';
import mongoose from 'mongoose';
import { authProtected } from '../../../middlewares/auth-protected';
import { PostModel } from '../../../models/post';
import { Resolve } from '../../../utils/express';
import { LikeInteraction } from '../../../models/like-interaction';
import { UserModel } from '../../../models/user';

/**
 * GET @ /post/:id
 *
 * This returns the post associated with the
 * given ID.
 */
export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

	const post = await PostModel.findById(id).lean();
	if (!post) return Resolve(res).notFound('Invalid post ID provided.');

	const user = await UserModel.findById(post.authorId).select('userName avatarUrl').lean();
	if (!user) return Resolve(res).notFound('User not found.');

	const postWithUser = {
		...post,
		userName: user.userName,
		avatarUrl: user.avatarUrl,
	};

	return Resolve(res).okWith(postWithUser);
};

/**
 * DELETE @ /post/:id
 *
 * This deletes the post associated with the given ID.
 * This does not fully delete the post, but it does
 * remove all like interactions and clears the content.
 *
 * We cannot simply drop the document from the database because
 * it could still be accessed by relationship from a comment.
 */
export const del: Handler[] = [
	authProtected,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid post ID provided.');

		const post = await PostModel.findById(id);
		if (!post) return Resolve(res).notFound('Invalid post ID provided.');

		const currentUser = req.user!;

		const postAuthor = await UserModel.findById(post.authorId);
		if (!postAuthor) return Resolve(res).error('The given post has no creator!');

		if (!postAuthor._id.equals(currentUser._id) && !currentUser.admin)
			return Resolve(res).forbidden('You cannot delete this post.');

		if (post.deleted) return Resolve(res).gone('Post is already deleted.');

		const session = await mongoose.startSession();

		try {
			const deletedPost = await session.withTransaction(async () => {
				const parentPostId = post.parentPost;
				if (parentPostId) {
					await PostModel.updateOne({ _id: parentPostId }, { $inc: { commentCount: -1 } }, { session });
				}

				await post.updateOne(
					{ deleted: true, content: '', likeCount: 0, $unset: { parentPost: 1 } },
					{ session },
				);

				await postAuthor.updateOne({ $inc: { postCount: -1 } }, { session });
				await LikeInteraction.deleteMany({ postId: post._id }, { session });

				return post;
			});

			Resolve(res).okWith(deletedPost, 'Post has been deleted.');
		} catch {
			Resolve(res).error('Error occured while trying to delete this post.');
		} finally {
			session.endSession();
		}
	},
];
