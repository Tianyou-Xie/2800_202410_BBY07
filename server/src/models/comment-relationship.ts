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

/**
 * The model representing the "commentrelationships" collection in MongoDB.
 *
 * This holds the relationship between comments and the original posts.
 */
export const CommentRelationship = model('CommentRelationship', schema);
