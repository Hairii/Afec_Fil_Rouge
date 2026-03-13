import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import gameRoutes from "./routes/game.routes.js";
import authRoutes from "./routes/auth.routes.js";
import genreRoutes from "./routes/genre.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/admin", adminRoutes);
export default app;
