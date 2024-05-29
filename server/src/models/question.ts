import { model, Schema } from 'mongoose';

/**
 * The interface for this model.
 */
interface IQuestion {
	question: string;
	answer: string;
	keywords: string[];
}

/**
 * The schema for this Model.
 */
const schema = new Schema<IQuestion>(
	{
		question: { type: 'string', required: true },
		answer: { type: 'string', required: true },
		keywords: { type: [], required: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

/**
 * The model representing the "questions" collection in MongoDB.
 */
export const QuestionModel = model('Question', schema);
