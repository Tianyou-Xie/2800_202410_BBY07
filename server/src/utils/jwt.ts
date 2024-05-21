import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../models/user';

/**
 * The interface describing the payload
 * type of the JWT token.
 */
export interface JWTPayload {
	userId: string;
}

/**
 * Utilities related to signing and verifying JWT payloads.
 */
export namespace JWT {
	const secret = process.env.JWT_SECRET;
	if (typeof secret !== 'string') throw 'JWT_SECREt is not present in environment variables!';

	const ttlString = process.env.JWT_TTL;
	if (typeof ttlString !== 'string') throw 'JWT_TTL is not present in environment variables.';

	const ttl = parseInt(ttlString);
	if (isNaN(ttl)) throw 'The JWT_TTL environment variable is not a number!';

	/**
	 * The secret used to verify and sign JWT tokens.
	 */
	export const SECRET = secret;

	/**
	 * The time, in minutes, that JWT tokens expire in.
	 */
	export const TTL_MINS = ttl;

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
