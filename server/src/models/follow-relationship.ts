import { model, Schema, Types } from 'mongoose';

export interface IFollowRelationship {
	initiateUserId: Types.ObjectId;
	targetUserId: Types.ObjectId;
}

const schema = new Schema<IFollowRelationship>(
	{
		initiateUserId: { type: 'ObjectID', ref: 'User', required: true, index: true },
		targetUserId: { type: 'ObjectID', ref: 'User', required: true, index: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

/**
 * The model representing the "followrelationships" collection in MongoDB.
 *
 * This holds follows between users.
 */
export const FollowRelationship = model('FollowRelationship', schema);
