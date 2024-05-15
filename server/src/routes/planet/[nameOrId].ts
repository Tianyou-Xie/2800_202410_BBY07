import { Handler } from 'express';
import { PlanetModel } from '../../models/planet';
import { escapeRegex } from '../../utils/regex';
import mongoose from 'mongoose';

export const get: Handler = async (req, res) => {
	const nameOrId = req.params.nameOrId;

	const isId = mongoose.isValidObjectId(nameOrId);
	let planet;
	if (isId) planet = await PlanetModel.findById(nameOrId).lean().exec();
	else
		planet = await PlanetModel.findOne({
			name: new RegExp(`^${escapeRegex(nameOrId)}$`, 'i'),
		});

	if (planet) res.json(planet);
	else res.status(404).json({ error: 'No planet by that name or ID was found.' });
};
