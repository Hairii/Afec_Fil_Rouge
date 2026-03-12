import express from 'express';
import { addComments, getCommentByGame, removeComments} from '../controllers/comments.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', addComments);
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';
router.get('/:game_id', verifyToken, getCommentByGame);
router.delete('/delete/:id',verifyToken, isAdmin,removeComments);

export default router;