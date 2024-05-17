import { model, Schema, Types } from 'mongoose';

export interface ICommentRelationship {
	parentPost: Types.ObjectId;
	childPost: Types.ObjectId;
}

const schema = new Schema<ICommentRelationship>(
	{
		parentPost: { type: 'ObjectID', ref: 'Post', required: true, index: true },
		childPost: { type: 'ObjectID', ref: 'Post', required: true, index: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const CommentRelationship = model('CommentRelationship', schema);
