import { model, Schema, Types } from 'mongoose';
import { ILocation, LocationSchema } from './location';

enum AuthProvider {
	GOOGLE = 'google',
}

interface ISSO {
	provider: AuthProvider;
	id: string;
}

export interface IUser {
	email?: string;
	password?: string;
	sso?: { provider: AuthProvider; id: string };
	userName: string;
	bio?: string;
	location: ILocation;
	birthDate?: Date;
	avatarUrl?: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	admin: boolean;
	savedPosts: Array<Types.ObjectId>;
	createdAt: Date;
}

const SSOSchema = new Schema<ISSO>({
	provider: { type: 'string', required: true },
	id: { type: 'string', required: true },
});

const schema = new Schema<IUser>(
	{
		email: { type: 'string' },
		sso: { type: SSOSchema },
		password: { type: 'string' },
		userName: { type: 'string', required: true },
		bio: { type: 'string' },
		location: { type: LocationSchema, required: true },
		birthDate: { type: 'date' },
		avatarUrl: { type: 'string' },
		followerCount: { type: 'number', required: true, default: 0 },
		followingCount: { type: 'number', required: true, default: 0 },
		postCount: { type: 'number', required: true, default: 0 },
		savedPosts: { type: ['ObjectId'], required: true, default: [] },
		admin: { type: 'boolean', required: true, default: false },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const UserModel = model('User', schema);
