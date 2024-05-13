import { model, Schema, Types } from 'mongoose';

export interface IFollowRelationship {
	initiateUserId: Types.ObjectId;
	targetUserId: Types.ObjectId;
}

const schema = new Schema<IFollowRelationship>(
	{
		initiateUserId: { type: 'ObjectID', ref: 'User', required: true },
		targetUserId: { type: 'ObjectID', ref: 'User', required: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const FollowRelationship = model('FollowRelationship', schema);
