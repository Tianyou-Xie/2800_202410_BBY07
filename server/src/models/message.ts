import { Schema, Types } from 'mongoose';
import { IMedia, MediaSchema } from './media';
import { ILocation, LocationSchema } from './location';

export interface IMessage {
	senderId: Types.ObjectId;
	receiverId: Types.ObjectId;
	createdAt: Date;
	media: Array<IMedia>;
	content: string;
	location: ILocation;
}

const schema = new Schema<IMessage>(
	{
		senderId: { type: 'ObjectId', ref: 'User', required: true },
		receiverId: { type: 'ObjectId', ref: 'User', required: true },
		content: { type: 'string', required: true },
		location: { type: LocationSchema, required: true },
		media: {
			required: true,
			default: [],
			type: [MediaSchema],
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);
