import { model, Schema, Types } from 'mongoose';

export interface Token {
	userId: Types.ObjectId;
    email: string;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
	createdAt: Date;
}

const schema = new Schema<Token>(
	{
        userId: { type: 'ObjectID', ref: 'User', required: true },
		email: { type: 'string', required: true },
		passwordResetToken: { type: 'string' },
		passwordResetExpires: { type: 'date' },
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export const TokenModel = model('Token', schema);
