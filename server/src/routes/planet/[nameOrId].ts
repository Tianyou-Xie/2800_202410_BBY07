import { Handler } from 'express';
import { PlanetModel } from '../../models/planet';
import { escapeRegex } from '../../utils/regex';
import mongoose from 'mongoose';
import { Resolve } from '../../utils/express';

export const get: Handler = async (req, res) => {
	const nameOrId = req.params.nameOrId;

	const isId = mongoose.isValidObjectId(nameOrId);
	let planet;
	if (isId) planet = await PlanetModel.findById(nameOrId).lean().exec();
	else
		planet = await PlanetModel.findOne({
			name: new RegExp(`^${escapeRegex(nameOrId)}$`, 'i'),
		});

	if (planet) Resolve(res).okWith(planet);
	else Resolve(res).notFound('No planet by that name or ID was found.');
};
