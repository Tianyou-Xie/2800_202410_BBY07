import { model, Schema, Types } from 'mongoose';

export interface ILikeInteraction {
	postId: Types.ObjectId;
	userId: Types.ObjectId;
}

const schema = new Schema<ILikeInteraction>(
	{
		postId: { type: 'ObjectID', ref: 'Post', required: true, index: true },
		userId: { type: 'ObjectID', ref: 'User', required: true, index: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

/**
 * The model representing the "likeinteractions" collection in MongoDB.
 *
 * This holds likes on posts made by users.
 */
export const LikeInteraction = model('LikeInteraction', schema);
