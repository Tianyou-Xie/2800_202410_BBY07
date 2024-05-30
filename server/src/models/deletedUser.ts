import { model, ObjectId, Schema, Types } from 'mongoose';
import { ILocation, LocationSchema } from './location';
import { AuthProvider, SSOSchema } from './user';

interface IDeletedUser {
	originID: ObjectId;
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
	deleted: boolean;
	savedPosts: Array<Types.ObjectId>;
	createdAt: Date;
}

const schema = new Schema<IDeletedUser>({
	originID: { type: Object, required: true },
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
	deleted: { type: 'boolean', required: true },
	// createdAt: {type: Date, default: new Date(), expires: 2592000}
	createdAt: { type: Date, default: new Date() },
});

/**
 * The model representing the "deletedusers" collection in MongoDB.
 *
 * This holds records of all deleted users that were anonomized on
 * the main "users" collection.
 */
export const DeletedUserModel = model('DeletedUser', schema);
