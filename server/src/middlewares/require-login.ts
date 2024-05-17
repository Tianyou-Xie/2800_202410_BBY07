import { NextFunction, Request, Response } from 'express';
import { Resolve } from '../utils/express';
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user';

/**
 * Middleware to ensure that the user object exists in the current session information, if it does exist it means that the given user is currently authenticated.
 */
/*export function requireLogin(req: Request, res: Response, next: NextFunction) {
	if (req.session.user) {
		next();
	} else Resolve(res).unauthorized('Authentication is required.');
}*/

export async function requireLogin(req: any, res: Response, next: NextFunction) {
	let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, 'abc123')

            // Get user from the token
            req.user = await UserModel.findById(decoded.id).select('-password')

            next()
        } catch(error) {
            console.log(error)
            res.status(401)
            // throw new Error('Not authorized')
            res.json({ success: false, message: 'Not authorized'});
        }
    }

    if(!token) {
        res.status(401)
        // throw new Error('Not authorized, no token');
        res.json({ success: false, message: 'Not authorized'});
    }
}
