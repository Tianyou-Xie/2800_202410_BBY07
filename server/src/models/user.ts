import { model, Schema, Types } from 'mongoose';

interface IUser {
	email: string;
	password: string;
	userName: string;
	bio?: string;
	location: Types.ObjectId;
	birthDate?: Date;
	avatarUrl?: string;
	followerCount: number;
	followingCount: number;
}

const schema = new Schema<IUser>({
	email: { type: 'string', required: true },
	password: { type: 'string', required: true },
	userName: { type: 'string', required: true },
	bio: { type: 'string' },
	location: { type: 'ObjectId', ref: 'PlanetLocation' },
	birthDate: { type: 'date' },
	avatarUrl: { type: 'string' },
	followerCount: { type: 'number', required: true, default: 0 },
	followingCount: { type: 'number', required: true, default: 0 },
});

export const UserModel = model('User', schema);
