import './src/environment';
import express from 'express';
import createRouter from 'express-file-routing';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
// import multipart from 'connect-multiparty'

import { requestLogger } from './src/middlewares/log.js';
import { getServerHost, SERVER_PORT } from './src/environment';

const PROJECT_ROOT = path.join(__dirname, 'src');

(async () => {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: { origin: '*' } /*cors: { origin: "http://localhost:8000", methods: ['GET', 'POST']}*/,
	});

	io.on('connection', (socket) => {
		socket.on('disconnect', () => {
			// console.log('Client disconnected');
		});

		socket.on('sendID', (convoID: string) => {
			socket.join(convoID);
		});

		socket.on('sendMessage', (convoID: string) => {
			socket.to(convoID).emit('displayMessage');
		});
	});

	app.set('socketio', io);
	app.use(cors());

	app.use(express.urlencoded({ extended: true, limit: '5mb', parameterLimit: 100 }));
	app.use(express.json({ limit: '5mb' }));
	app.use(requestLogger);
	// app.use(multipart());

	const mongoUrl = process.env.MONGO_URL!;
	await mongoose.connect(mongoUrl);

	await createRouter(app, { directory: path.join(PROJECT_ROOT, 'routes') });

	server.listen(SERVER_PORT, () => {
		console.log(`Server is now running. (${getServerHost()})`);
	});
})();
