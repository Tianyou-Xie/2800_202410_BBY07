import { model, Schema, Types } from 'mongoose';

export interface IRepostRelationship {
	targetPost: Types.ObjectId;
	repostPost: Types.ObjectId;
}

const schema = new Schema<IRepostRelationship>(
	{
		targetPost: { type: 'ObjectID', ref: 'Post', required: true },
		repostPost: { type: 'ObjectID', ref: 'Post', required: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const RepostRelationship = model('RepostRelationship', schema);
