import express from 'express';
import { addRating, getAllRatings } from '../controllers/rating.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();


const optionalToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return next();
  verifyToken(req, res, next);
};

router.get('/:game_id', optionalToken, getAllRatings);
router.post('/add', verifyToken, addRating);

export default router;