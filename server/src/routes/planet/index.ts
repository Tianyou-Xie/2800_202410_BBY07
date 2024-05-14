import { Handler } from 'express';
import { PlanetModel } from '../../models/planet';

export const get: Handler = async (_, res) => {
	const planets = await PlanetModel.find({}).lean().exec();
	res.json({ planets });
};
