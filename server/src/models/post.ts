import { model, Schema, Types } from 'mongoose';

interface IPost {
	authorId: Types.ObjectId;
	content: string;
	likeCount: number;
	commentCount: number;
	repostCount: number;
	createdAt: Date;
	locationId: Types.ObjectId;
	media: Array<{
		mediaType: string;
		mediaUrl: string;
	}>;
}

const schema = new Schema<IPost>(
	{
		authorId: { type: 'ObjectID', ref: 'User', required: true },
		content: { type: 'string', required: true },
		likeCount: { type: 'number', required: true, default: 0 },
		commentCount: { type: 'number', required: true, default: 0 },
		repostCount: { type: 'number', required: true, default: 0 },
		locationId: { type: 'ObjectID', ref: 'Location', required: true },
		media: {
			required: true,
			default: [],
			type: [
				{
					mediaType: { type: 'string', required: true },
					mediaUrl: { type: 'string', required: true },
				},
			],
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const PostModel = model('Post', schema);
