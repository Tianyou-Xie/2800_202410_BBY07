import { model, Schema } from 'mongoose';

interface IQuestion {
	question: string;
	answer: string;
}

const schema = new Schema<IQuestion>(
	{
		question: { type: 'string', required: true },
		answer: { type: 'string', required: true },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const QuestionModel = model('Question', schema);
