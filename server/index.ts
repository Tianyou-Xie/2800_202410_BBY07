import './src/load-env.js';

import express from 'express';
import createRouter from 'express-file-routing';
import path from 'path';

const PROJECT_ROOT = path.join(__dirname, 'src');
const PORT = process.env.PORT;

(async () => {
	const app = express();

	await createRouter(app, { directory: path.join(PROJECT_ROOT, 'routes') });

	app.listen(PORT, () => {
		console.log(`Server is running with port "${PORT}". (http://localhost:${PORT})`);
	});
})();
