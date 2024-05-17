import { Handler } from 'express';
import { PlanetModel } from '../../models/planet';
import { Resolve } from '../../utils/express';

export const get: Handler = async (_, res) => {
	const planets = await PlanetModel.find({}).lean().exec();
	Resolve(res).okWith(planets);
};
