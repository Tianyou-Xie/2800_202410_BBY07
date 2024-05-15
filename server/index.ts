import './src/load-env.js';

import express from 'express';
import createRouter from 'express-file-routing';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import mongoose from 'mongoose';
import { requestLogger } from './src/middlewares/log.js';

const PROJECT_ROOT = path.join(__dirname, 'src');
const PORT = process.env.PORT;

(async () => {
	const app = express();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(requestLogger);

	const mongoUrl = process.env.MONGO_URL!;
	await mongoose.connect(mongoUrl);

	app.use(
		session({
			secret: process.env.SESSION_COOKIE_SECRET!,
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: parseInt(process.env.SESSION_TTL!) },
			store: MongoStore.create({
				mongoUrl: mongoUrl,
				crypto: { secret: process.env.SESSION_DATA_SECRET! },
			}),
		}),
	);

	await createRouter(app, { directory: path.join(PROJECT_ROOT, 'routes') });

	app.listen(PORT, () => {
		console.log(`Server is running with port "${PORT}". (http://localhost:${PORT})`);
	});
})();
