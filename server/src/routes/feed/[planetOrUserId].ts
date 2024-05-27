import { Handler } from 'express';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';
import { PlanetModel } from '../../models/planet';
import mongoose from 'mongoose';
import { UserModel } from '../../models/user';

export const get: Handler = async (req, res) => {
	const planetOrUserId = req.params.planetOrUserId;
	if (!mongoose.isValidObjectId(planetOrUserId)) return Resolve(res).badRequest('Invalid planet ID specified.');

	let search;
	const existingPlanet = await PlanetModel.exists({ _id: planetOrUserId }).lean();
	if (existingPlanet) search = { 'location.planetId': existingPlanet._id };
	else {
		const existingUser = await UserModel.exists({ _id: planetOrUserId }).lean();
		if (existingUser) search = { authorId: existingUser._id };
		else return Resolve(res).notFound('No planet or user by the given ID exists.');
	}

	const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
	const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
	const limit = 20;
	const skip = (page - 1) * limit;

	const latestPosts = await PostModel.find(search).sort({ createdAt: 'descending' }).skip(skip).limit(limit).lean();
	Resolve(res).okWith(latestPosts);
};
