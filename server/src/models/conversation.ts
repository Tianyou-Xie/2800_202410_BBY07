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

export const ConversationModel = model('Conversation', schema);