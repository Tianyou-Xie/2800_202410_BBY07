import './src/load-env.js';

import express from 'express';
import createRouter from 'express-file-routing';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import { requestLogger } from './src/middlewares/log.js';

const PROJECT_ROOT = path.join(__dirname, 'src');
const PORT = process.env.PORT;

(async () => {
	const app = express();

	app.use(
		cors({
			origin: ['http://localhost:8000', 'https://skynetwork.app', 'https://dev.skynetwork.app'],
			optionsSuccessStatus: 200,
		}),
	);

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(requestLogger);

	const mongoUrl = process.env.MONGO_URL!;
	await mongoose.connect(mongoUrl);

	await createRouter(app, { directory: path.join(PROJECT_ROOT, 'routes') });

	app.listen(PORT, () => {
		console.log(`Server is running with port "${PORT}". (http://localhost:${PORT})`);
	});
})();
