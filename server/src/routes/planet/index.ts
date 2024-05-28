import { Handler } from 'express';
import { PlanetModel } from '../../models/planet';
import { Resolve } from '../../utils/express';

/**
 * GET @ /planet
 *
 * This returns all the planets currently in the database.
 */
export const get: Handler = async (_, res) => {
	const planets = await PlanetModel.find({}).lean().exec();
	Resolve(res).okWith(planets);
};
