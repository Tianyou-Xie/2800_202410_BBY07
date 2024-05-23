import { model, Schema } from 'mongoose';

interface IPlanetVisual {
	radius: number;
	orbitRadius: number;
	orbitDuration?: number;
}

export interface IPlanet {
	name: string;
	visual: IPlanetVisual;
}

const visualSchema = new Schema<IPlanetVisual>(
	{
		radius: { type: 'number', required: true },
		orbitRadius: { type: 'number', required: true },
		orbitDuration: { type: 'number' },
	},
	{ _id: false },
);

const schema = new Schema<IPlanet>({
	name: { type: 'string', required: true },
	visual: { type: visualSchema, required: true },
});

export const PlanetModel = model('Planet', schema);
