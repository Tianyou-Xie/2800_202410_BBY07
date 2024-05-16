import Joi from 'joi';
import { Handler } from 'express';
import { requireLogin } from '../../middlewares/require-login';
import { assertRequestBody, Resolve } from '../../utils/express';
import { IMedia, RawMediaSchema } from '../../models/media';
import { ILocation, RawLocationSchema } from '../../models/location';
import { RawDocument } from '../../@types/model';
import { PostModel } from '../../models/post';
import { UserModel } from '../../models/user';
import mongoose from 'mongoose';

interface PostBody {
	content: string;
	location?: RawDocument<ILocation>;
	media?: RawDocument<IMedia>;
}

export const post: Handler[] = [
	requireLogin,
	async (req, res) => {
		const authorId = req.session.user!.id;

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

		const currentUser = await UserModel.findById(authorId);
		if (!currentUser) return Resolve(res).unauthorized('You are not authorized to post.');

		const session = await mongoose.startSession();

		try {
			const post = await session.withTransaction(async () => {
				const post = new PostModel({
					authorId,
					content: body.content,
					media: body.media,
					location: body.location ?? currentUser.location,
				});

				currentUser.postCount++;
				await currentUser.save({ session });

				await post.save({ session });
				return post;
			});

			Resolve(res).created(post, 'Post created successfully.');
		} catch {
			Resolve(res).error('Error occured while trying to create this post.');
		} finally {
			await session.endSession();
		}
	},
];
