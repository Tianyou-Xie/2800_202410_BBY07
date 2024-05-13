import { Schema } from 'mongoose';

export interface IMedia {
	mediaType: string;
	mediaUrl: string;
}

export const MediaSchema = new Schema<IMedia>({
	mediaType: { type: 'string', required: true },
	mediaUrl: { type: 'string', required: true },
});
