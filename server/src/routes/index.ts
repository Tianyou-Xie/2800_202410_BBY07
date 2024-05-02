import { Handler } from 'express';

export const get: Handler = async (_, res) => {
	res.send('Hello World!');
};
