import { model, Schema, Types } from 'mongoose';
import { ILocation, LocationSchema } from './location';

export interface IUser {
	email: string;
	password: string;
	userName: string;
	bio?: string;
	location: ILocation;
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
		location: { type: LocationSchema, required: true },
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
