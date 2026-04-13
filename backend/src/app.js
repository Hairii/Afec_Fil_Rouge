import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from 'path';
import { fileURLToPath } from 'url';


import gameRoutes from "./routes/game.routes.js";
import authRoutes from "./routes/auth.routes.js";
import genreRoutes from "./routes/genre.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, '../../frontend')));

app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/admin", adminRoutes);


app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
});
export default app;
