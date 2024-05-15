import Joi from 'joi';
import mongoose from 'mongoose';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { createHash } from '../../utils/bcrypt';
import { PlanetModel } from '../../models/planet';
import { setSession } from '../../utils/session';
import { assertRequestBody, Resolve } from '../../utils/express';

interface PostBody {
	email: string;
	userName: string;
	password: string;
	location: {
		planetId: string;
		latitude: number;
		longitude: number;
	};
}

export const post: Handler = async (req, res) => {
	const body = assertRequestBody(
		req,
		res,
		Joi.object<PostBody>({
			email: Joi.string().trim().email().required(),
			userName: Joi.string().trim().required(),
			password: Joi.string().required(),
			location: Joi.object({
				planetId: Joi.string().trim().required(),
				latitude: Joi.number().min(-90).max(90).required(),
				longitude: Joi.number().min(-180).max(180).required(),
			}).required(),
		}),
	);

	if (!body) return;

	const existingEmail = await UserModel.findOne({ email: body.email }).lean().exec();
	if (existingEmail) return Resolve(res).conflict('Email is already registered.');

	const isPlanetId = mongoose.isValidObjectId(body.location.planetId);
	if (!isPlanetId) return Resolve(res).badRequest('The given planet ID is invalid.');

	const planet = await PlanetModel.findById(body.location.planetId).lean().exec();
	if (!planet) return Resolve(res).badRequest('The given location does not exist.');

	const user = new UserModel({
		email: body.email,
		userName: body.userName,
		password: await createHash(body.password),
		location: body.location,
	});

	await user.save();
	setSession(req, user);
	Resolve(res).created(undefined, 'User and session created, signup successful.');
};
