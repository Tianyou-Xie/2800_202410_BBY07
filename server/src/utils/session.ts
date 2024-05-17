import { Request } from 'express';
import { IUser, UserModel } from '../models/user';
import { HydratedDocument } from 'mongoose';

/**
 * Sets the current session to the specified user model.
 *
 * @param req the request object to set the session on
 * @param user the user document to use to set the session properties
 */
export function setSession(req: Request, user: HydratedDocument<IUser>) {
	req.session.user = { id: user._id.toString(), email: user.email, userName: user.userName };
}

/**
 * Returns whether the current session is the session of the given user.
 *
 * @param req the request to check
 * @param user the user to check the session against
 */
export function isSessionOf(req: Request, user: HydratedDocument<IUser>) {
	return req.session.user && req.session.user.id === user._id.toString();
}

/**
 * Returns the user of the current session, based on the request,
 * as a hydrated model.
 *
 * @param req the request object
 * @returns the hydrated model, or nothing if there is no current user
 */
export async function getHydratedUser(req: Request) {
	try {
		const id = req.session.user?.id;
		if (!id) return;

		return await UserModel.findById(id);
	} catch {}
}
