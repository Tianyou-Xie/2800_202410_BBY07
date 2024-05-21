import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../models/user';

/**
 * An interface defining a user authorization method.
 *
 * An adapter should be stateless, meaning they can
 * be reused with any number of requests.
 */
export interface AuthAdapter {
	/**
	 * Parses an authorization token from a given
	 * Express request object, if one can be found.
	 */
	parseToken(req: Request): string | undefined;

	/**
	 * Verifies an authorization token into a hydrated database user,
	 * if one exists.
	 */
	verifyToUser(token: string): Promise<HydratedDocument<IUser> | undefined | null>;
}
