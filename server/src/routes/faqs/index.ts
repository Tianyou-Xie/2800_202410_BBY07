import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { QuestionModel } from '../../models/question';
import { Resolve } from '../../utils/express';
import Joi from 'joi';
import { Document } from 'mongoose';

interface QueryBody {
	query: string;
}

const minSearchLen = 1;
const maxSearchLen = 30;

export const get: Handler[] = [
	authProtected,
	async (req, res) => {
		const questions = await QuestionModel.find();
		Resolve(res).okWith(questions, 'All questions sent.');
	},
];

export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const querySchema = Joi.object<QueryBody>({
			query: Joi.string().trim().min(minSearchLen).max(maxSearchLen).messages({
				'string.base': 'The given search must be a string.',
				'string.min': 'You must enter a search.',
				'string.max': 'Search too long.',
				'any.required': 'A search request is required to search.',
			}),
		});

		const validationResult = querySchema.validate(req.body);
		if (validationResult.error) return Resolve(res).badRequest(validationResult.error.message);

		const value = validationResult.value;
		const queryArr: string[] = value.query.split(/\W+/);
		const questions = await QuestionModel.find();
		let quesToSend: Document[] = [];

		for (let i = 0; i < questions.length; i++) {
			queryArr.forEach((q) => {
				if (questions[i].keywords.includes(q)) quesToSend.push(questions[i]);
			});
		}

		if (quesToSend.length === 0) return Resolve(res).notFound('No questions could be found.');

		return Resolve(res).okWith(quesToSend, 'Questions were found.');
	},
];
