import { model, Schema, Types } from 'mongoose';

interface ILocation {
	planetId: Types.ObjectId;
	name: string;
	latitude: number;
	longitude: number;
}

const schema = new Schema<ILocation>({
	planetId: { type: 'ObjectID', ref: 'Planet', required: true },
	name: { type: 'string', required: true },
	latitude: { type: 'number', required: true },
	longitude: { type: 'number', required: true },
});

export const LocationModel = model('Location', schema);
