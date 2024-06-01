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

/**
 * The model representing the "tokens" collection in MongoDB.
 *
 * This is associated with password reset tokens.
 */
export const TokenModel = model('Token', schema);
