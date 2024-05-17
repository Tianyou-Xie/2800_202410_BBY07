import { model, Schema, Types } from 'mongoose';
import { ILocation, LocationSchema } from './location';
import { IMedia, MediaSchema } from './media';

export interface IPost {
	authorId: Types.ObjectId;
	content: string;
	likeCount: number;
	commentCount: number;
	repostCount: number;
	createdAt: Date;
	location: ILocation;
	media: Array<IMedia>;
	deleted: boolean;
}

const schema = new Schema<IPost>(
	{
		authorId: { type: 'ObjectID', ref: 'User', required: true, index: true },
		content: { type: 'string', required: true },
		likeCount: { type: 'number', required: true, default: 0 },
		commentCount: { type: 'number', required: true, default: 0 },
		repostCount: { type: 'number', required: true, default: 0 },
		location: { type: LocationSchema, required: true },
		deleted: { type: 'boolean', required: true, default: false },
		media: {
			required: true,
			default: [],
			type: [MediaSchema],
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const PostModel = model('Post', schema);
