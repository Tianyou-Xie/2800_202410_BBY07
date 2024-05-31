import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { assertRequestBody, Resolve } from '../../../utils/express';
import { PostModel } from '../../../models/post';
import { RawDocument } from '../../../@types/model';
import { ILocation, RawLocationSchema } from '../../../models/location';
import { IMedia, RawMediaSchema } from '../../../models/media';
import Joi from 'joi';

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

	const comments = await PostModel.aggregate([
		{ $match: { parentPost: new mongoose.Types.ObjectId(parentPostId), deleted: false } },
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
			const createdComment = await session.withTransaction(async () => {
				const comment = new PostModel({
					authorId: currentUser._id,
					content: body.content,
					media: body.media,
					location: body.location ?? currentUser.location,
					parentPost: parentPost._id,
				});

				await comment.save({ session });

				currentUser.postCount++;
				await currentUser.save({ session });

				parentPost.commentCount++;
				await parentPost.save({ session });

				return comment;
			});

			const responseComment = {
				...createdComment.toObject(),
				userName: currentUser.userName,
				avatarUrl: currentUser.avatarUrl,
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
