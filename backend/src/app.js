import express from'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';



import authRoutes from './routes/auth.routes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());


app.use('/api/auth', authRoutes);
export default app;