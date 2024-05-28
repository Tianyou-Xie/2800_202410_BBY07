import { model, Schema, Types } from 'mongoose';
import { IMedia, MediaSchema } from './media';
import { ILocation, LocationSchema } from './location';

export interface IMessage {
	conversationId: Types.ObjectId;
	senderId: Types.ObjectId;
	createdAt: Date;
	media: Array<IMedia>;
	content: string;
	location: ILocation;
}

const schema = new Schema<IMessage>(
	{
		conversationId: { type: 'ObjectId', ref: 'Conversation', required: true },
		senderId: { type: 'ObjectId', ref: 'User', required: true },
		content: { type: 'string', required: true },
		// location: { type: LocationSchema, required: true },
		media: {
			required: true,
			default: [],
			type: [MediaSchema],
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

/**
 * The model representing the "messages" collection in MongoDB.
 *
 * This stores all chat messages in conversations between users.
 */
export const MessageModel = model('Message', schema);
