import Joi from 'joi';
import { Schema, Types } from 'mongoose';

export interface ILocation {
	planetId: Types.ObjectId;
	latitude: number;
	longitude: number;
}

export const LocationSchema = new Schema<ILocation>({
	planetId: { type: 'ObjectId', ref: 'Planet', required: true },
	latitude: { type: 'number', required: true },
	longitude: { type: 'number', required: true },
});

export const RawLocationSchema = Joi.object({
	planetId: Joi.string().trim().required(),
	latitude: Joi.number().min(-90).max(90).required(),
	longitude: Joi.number().min(-180).max(180).required(),
});
