import { config } from 'dotenv';

config();

export const isDev = () => process.env.NODE_ENV === 'development';
