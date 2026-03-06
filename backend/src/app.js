import express from'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import db from './config/db.js';

import {fileURLToPath} from 'url';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

export default app;