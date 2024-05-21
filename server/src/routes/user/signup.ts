import Joi from 'joi';
import mongoose from 'mongoose';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { createHash } from '../../utils/bcrypt';
import { PlanetModel } from '../../models/planet';
import { assertRequestBody, Resolve } from '../../utils/express';
import { ILocation, RawLocationSchema } from '../../models/location';
import { RawDocument } from '../../@types/model';
import { JWT } from '../../utils/jwt';

interface PostBody {
	email: string;
	userName: string;
	password: string;
	location: RawDocument<ILocation>;
}

const inflightEmails = new Set<string>();

export const post: Handler = async (req, res) => {
	const body = assertRequestBody(
		req,
		res,
		Joi.object<PostBody>({
			email: Joi.string().trim().email().required(),
			userName: Joi.string().trim().required(),
			password: Joi.string().required(),
			location: RawLocationSchema,
		}),
	);

	if (!body) return;

	if (inflightEmails.has(body.email)) return Resolve(res).conflict('Email is currently registering.');
	inflightEmails.add(body.email);

	try {
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
		Resolve(res).okWith(JWT.signAs(user));
	} finally {
		inflightEmails.delete(body.email);
	}
};
