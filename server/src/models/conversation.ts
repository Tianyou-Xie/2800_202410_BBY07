import { model, Schema, Types } from 'mongoose';
import { IMedia } from './media';
import { ILocation } from './location';

export interface IConversation {
	senderId: Types.ObjectId;
	receiverId: Types.ObjectId;
	createdAt: Date;
	media: Array<IMedia>;
	content: string;
	location: ILocation;
}

const schema = new Schema<IConversation>(
	{
		senderId: { type: 'ObjectId', ref: 'User', required: true },
		receiverId: { type: 'ObjectId', ref: 'User', required: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

/**
 * The model representing the "conversations" collection in MongoDB.
 *
 * This holds all initiated chat conversations between users, but not
 * the messages themselves.
 */
export const ConversationModel = model('Conversation', schema);
