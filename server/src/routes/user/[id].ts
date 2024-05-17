import Joi from 'joi';
import mongoose from 'mongoose';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { requireLogin } from '../../middlewares/require-login';
import { assertRequestBody, Resolve } from '../../utils/express';

export const get: Handler = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided.');

	const user = await UserModel.findById(id).lean().select('-admin -email -password');
	if (!user) Resolve(res).notFound('No user found by the given ID.');
	else Resolve(res).okWith(user);
};

interface PatchBody {
	userName?: string;
	email?: string;
	bio?: string;
}

export const patch: Handler[] = [
	requireLogin,
	async (req, res) => {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided');

		const user = req.user!;
		if (!user._id.equals(id)) return Resolve(res).forbidden('You are not authorized to modify this user.');

		const body = assertRequestBody(
			req,
			res,
			Joi.object<PatchBody>({
				userName: Joi.string().trim(),
				email: Joi.string().trim().email(),
				bio: Joi.string().trim(),
			}),
		);

		if (!body) return;

		if (body.email) {
			const existing = await UserModel.findOne({ email: body.email }).lean();
			if (existing) return Resolve(res).conflict('Email already exists.');
		}

		await user.updateOne(body);
		Resolve(res).ok();
	},
];
