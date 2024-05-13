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
