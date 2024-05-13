import Joi from 'joi';
import { Handler } from 'express';
import { UserModel } from '../../models/user';
import { createHash } from '../../utils/bcrypt';
import { PlanetModel } from '../../models/planet';

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
	const bodySchema = Joi.object<PostBody>({
		email: Joi.string().trim().email().required().messages({
			'string.base': 'The given email must be a string.',
			'string.email': 'The given email is invalid.',
			'any.required': 'Email is required.',
		}),
		userName: Joi.string().trim().required().messages({
			'string.base': 'The given username must be a string.',
			'any.required': 'Username is required.',
		}),
		password: Joi.string().required().messages({
			'string.base': 'The given password must be a string.',
			'any.required': 'Password is required.',
		}),
		location: Joi.object({
			planetId: Joi.string().trim().required().messages({
				'string.base': 'The given planet ID must be a string.',
				'any.required': 'Location planet ID is required.',
			}),
			latitude: Joi.number().min(0).max(90).required().messages({
				'number.base': 'The given latitude must be a number.',
				'number.min': 'The given latitude must be above 0.',
				'number.max': 'The given latitude must be below 90.',
				'any.required': 'Location latitude is required.',
			}),
			longitude: Joi.number().min(0).max(90).required().messages({
				'number.base': 'The given longitude must be a number.',
				'number.min': 'The given longitude must be above 0.',
				'number.max': 'The given longitude must be below 90.',
				'any.required': 'Location longitude is required.',
			}),
		}),
	});

	const bodyValidationResult = bodySchema.validate(req.body);
	if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

	const { value: body } = bodyValidationResult;

	const existingEmail = await UserModel.findOne({ email: body.email }).lean().exec();
	if (existingEmail) return res.status(422).json({ error: `Email is already registered.` });

	const planet = await PlanetModel.findById(body.location.planetId).lean().exec();
	if (!planet) return res.status(400).json({ error: 'The given location does not exist.' });

	const user = new UserModel({
		email: body.email,
		userName: body.userName,
		password: await createHash(body.password),
		location: body.location,
	});

	await user.save();
	req.session.user = { email: user.email, name: user.userName };
};
