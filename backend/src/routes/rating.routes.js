import express from 'express';
import {addRating, getAllRatings} from '../controllers/rating.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';

const router =  express.Router();

router.get('/:game_id', getAllRatings);
router.post('/add', verifyToken, addRating);

export default router;