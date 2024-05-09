import { model, Schema } from 'mongoose';

interface IPost {
	content: string;
	likeCount: number;
	commentCount: number;
	repostCount: number;
	createdAt: Date;
	media: Array<{
		mediaType: string;
		mediaUrl: string;
	}>;
}

const schema = new Schema<IPost>(
	{
		content: { type: 'string', required: true },
		likeCount: { type: 'number', required: true, default: 0 },
		commentCount: { type: 'number', required: true, default: 0 },
		repostCount: { type: 'number', required: true, default: 0 },
		media: {
			required: true,
			default: [],
			type: [
				{
					mediaType: { type: 'string', required: true },
					mediaUrl: { type: 'string', required: 'true' },
				},
			],
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const PostModel = model('Post', schema);