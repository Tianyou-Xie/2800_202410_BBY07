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

export const LikeInteraction = model('LikeInteraction', schema);
