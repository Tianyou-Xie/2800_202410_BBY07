import { model, Schema, Types } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	userName: string;
	bio?: string;
	location: { planetId: Types.ObjectId; latitude: number; longitude: number };
	birthDate?: Date;
	avatarUrl?: string;
	followerCount: number;
	followingCount: number;
	admin: boolean;
	savedPosts: Array<Types.ObjectId>;
	createdAt: Date;
}

const schema = new Schema<IUser>(
	{
		email: { type: 'string', required: true },
		password: { type: 'string', required: true },
		userName: { type: 'string', required: true },
		bio: { type: 'string' },
		location: {
			type: {
				planetId: { type: 'ObjectId', ref: 'Planet', required: true },
				latitude: { type: 'number', required: true, default: 0 },
				longitude: { type: 'number', required: true, default: 0 },
			},
			required: true,
		},
		birthDate: { type: 'date' },
		avatarUrl: { type: 'string' },
		followerCount: { type: 'number', required: true, default: 0 },
		followingCount: { type: 'number', required: true, default: 0 },
		savedPosts: { type: ['ObjectId'], required: true, default: [] },
		admin: { type: 'boolean', required: true, default: false },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const UserModel = model('User', schema);
