import Joi from 'joi';
import { Schema } from 'mongoose';

export interface IMedia {
	mediaType: string;
	mediaUrl: string;
	mediaAlt?: string;
}

export const MediaSchema = new Schema<IMedia>({
	mediaType: { type: 'string', required: true },
	mediaUrl: { type: 'string', required: true },
	mediaAlt: { type: 'string' },
});

export const RawMediaSchema = Joi.array().items({
	mediaType: Joi.string().trim().required(),
	mediaUrl: Joi.string().trim().required(),
	mediaAlt: Joi.string().trim(),
});
