import { model, Schema } from 'mongoose';

export interface IPlanet {
	name: string;
}

const schema = new Schema<IPlanet>({
	name: { type: 'string', required: true },
});

export const PlanetModel = model('Planet', schema);
