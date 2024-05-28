import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { assertRequestBody, Resolve } from '../../../utils/express';
import { PostModel } from '../../../models/post';
import { RawDocument } from '../../../@types/model';
import { ILocation, RawLocationSchema } from '../../../models/location';
import { IMedia, RawMediaSchema } from '../../../models/media';
import Joi from 'joi';
import { CommentRelationship } from '../../../models/comment-relationship';
import { UserModel } from '../../../models/user';

interface PostBody {
	content: string;
	location?: RawDocument<ILocation>;
	media?: RawDocument<IMedia>;
}

/**
 * GET @ /post/:id/comment
 *
 * This retrieves the comments for the given
 * post ID.
 */
export const get: Handler = async (req, res) => {
	const parentPostId = req.params.id;

	const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
	const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
	const limit = 20;
	const skip = (page - 1) * limit;

	if (!mongoose.isValidObjectId(parentPostId)) return Resolve(res).badRequest('Invalid post ID provided.');

	const relationships = await CommentRelationship.find({ parentPost: parentPostId })
		.sort({ createdAt: 'descending' })
		.skip(skip)
		.limit(limit);

	const comments = await Promise.all(
		relationships.map(async (v) => {
			const comment = await PostModel.findById(v.childPost).lean();
			if (comment) {
				const user = await UserModel.findById(comment.authorId).lean();
				const post = await PostModel.findById(comment._id).lean();
				if (user && post) {
					return {
						...comment,
						userName: user.userName,
					};
				}
			}
			return comment;
		}),
	);

	Resolve(res).okWith(comments);
};

/**
 * POST @ /post/:id/comment
 *
 * This creates a new comment for the given post ID.
 */
export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const parentPostId = req.params.id;
		if (!mongoose.isValidObjectId(parentPostId)) return Resolve(res).badRequest('Invalid post ID provided.');

		const parentPost = await PostModel.findById(parentPostId);
		if (!parentPost) return Resolve(res).notFound('Invalid post ID provided.');

		if (parentPost.deleted) return Resolve(res).gone('The given post is deleted.');

		const body = assertRequestBody(
			req,
			res,
			Joi.object<PostBody>({
				content: Joi.string().trim().required(),
				location: RawLocationSchema,
				media: RawMediaSchema,
			}),
		);

		if (!body) return;

		const currentUser = req.user!;
		const session = await mongoose.startSession();

		try {
			const commentRelationship = await session.withTransaction(async () => {
				const comment = new PostModel({
					authorId: currentUser._id,
					content: body.content,
					media: body.media,
					location: body.location ?? currentUser.location,
					isRoot: false,
				});

				const relationship = new CommentRelationship({
					parentPost: parentPost._id,
					childPost: comment._id,
				});

				await comment.save({ session });
				await relationship.save({ session });

				currentUser.postCount++;
				await currentUser.save({ session });

				parentPost.commentCount++;
				await parentPost.save({ session });

				return relationship;
			});

			// Fetch the newly created comment with user information
			const newComment = await PostModel.findById(commentRelationship.childPost).lean();
			if (!newComment) throw new Error('Failed to fetch the newly created comment.');
			const user = await UserModel.findById(newComment.authorId).lean();
			if (!user) throw new Error('Failed to fetch the user information of the comment author.');
			const responseComment = {
				...newComment,
				userName: user.userName,
				like: newComment.likeCount,
				comment: newComment.commentCount,
			};

			Resolve(res).created(responseComment, 'Comment created successfully.');
		} catch (error) {
			console.error('Error creating comment:', error);
			Resolve(res).error('Error occurred while trying to create this comment.');
		} finally {
			await session.endSession();
		}
	},
];
