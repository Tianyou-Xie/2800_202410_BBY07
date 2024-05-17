import jwt from 'jsonwebtoken';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, UserModel } from '../models/user';
import Joi from 'joi';

/**
 * The interface describing the payload
 * type of the JWT token.
 */
interface JWTPayload {
	userId: string;
	passwordHash: string;
}

/**
 * Schema to validate a decoded payload.
 */
const PayloadSchema = Joi.object<JWTPayload>({
	userId: Joi.string().required(),
	passwordHash: Joi.string().required(),
});

/**
 * Utilities related to signing and verifying JWT payloads.
 */
export namespace AuthToken {
	/**
	 * Verifies the given token with the JWT secret, and
	 * resolves it into a hydrated user model.
	 *
	 * @param token the token to verify
	 * @returns the resolved user, or nothing if the token was invalid or contained an invalid payload
	 */
	export async function verifyToUser(token: string) {
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
			const { error } = PayloadSchema.validate(payload);
			if (error) return;

			const userId = payload.userId;
			if (!mongoose.isValidObjectId(userId)) return;

			const user = await UserModel.findById(userId);
			if (!user || user.password !== payload.passwordHash) return;

			return user;
		} catch {}
	}

	/**
	 * Signs a new token with the JWT secret and expiry time.
	 *
	 * @param user the user to sign the token with
	 * @returns the signed token
	 */
	export function signAs(user: HydratedDocument<IUser>) {
		return jwt.sign(
			{ userId: user._id.toString(), passwordHash: user.password } satisfies JWTPayload,
			process.env.JWT_SECRET!,
			{ expiresIn: parseInt(process.env.JWT_TTL!) },
		);
	}
}
