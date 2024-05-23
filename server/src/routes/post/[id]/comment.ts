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

export const get: Handler = async (req, res) => {
	const parentPostId = req.params.id;

	const rawLimit = req.query.limit;
	let limit = typeof rawLimit === 'string' ? parseInt(rawLimit) : NaN;
	if (isNaN(limit)) limit = 10;
	limit = Math.max(0, Math.min(limit, 100));

	if (!mongoose.isValidObjectId(parentPostId)) return Resolve(res).badRequest('Invalid post ID provided.');

	const relationships = await CommentRelationship.find({ parentPost: parentPostId }).limit(limit);
	const comments = await Promise.all(
		relationships.map(async (v) => {
			const comment = await PostModel.findById(v.childPost).lean();
			if (comment) {
				const user = await UserModel.findById(comment.authorId).lean(); // Add this line to fetch the user
				if (user) {
					return {
						...comment,
						userName: user.userName
					};
				}
			}
			return comment;
		}),
	);

	Resolve(res).okWith(comments);
};

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

			Resolve(res).created(commentRelationship, 'Comment created successfully.');
		} catch {
			Resolve(res).error('Error occured while trying to create this comment.');
		} finally {
			await session.endSession();
		}
	},
];
