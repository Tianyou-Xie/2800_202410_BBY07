import jwt from 'jsonwebtoken';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, UserModel } from '../models/user';

/**
 * The interface describing the payload
 * type of the JWT token.
 */
interface JWTPayload {
	userId: string;
}

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
			if (!payload || !('userId' in payload)) return;

			const userId = payload.userId;
			if (!mongoose.isValidObjectId(userId)) return;

			return await UserModel.findById(userId);
		} catch {}
	}

	/**
	 * Signs a new token with the JWT secret and expiry time.
	 *
	 * @param user the user to sign the token with
	 * @returns the signed token
	 */
	export function signAs(user: HydratedDocument<IUser>) {
		return jwt.sign({ userId: user._id.toString() } satisfies JWTPayload, process.env.JWT_SECRET!, {
			expiresIn: parseInt(process.env.JWT_TTL!),
		});
	}
}
