import express from 'express';
import {getOneGame, getAllGames} from '../controllers/game.controller.js';

const router = express.Router();

router.get('/',getAllGames);
router.get('/:id',getOneGame);

export default router;  