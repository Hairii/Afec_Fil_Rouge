import express from'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import db from './config/db.js';

import {fileURLToPath} from 'url';
import path from 'path';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.get('/test', (req, res) => res.json({ message: 'ok' }));
console.log('auth routes chargées');
app.use('/api/auth', authRoutes);
export default app;