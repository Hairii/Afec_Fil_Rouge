import express from 'express';
import { addComments, getCommentByGame, removeComments} from '../controllers/comments.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', verifyToken,addComments);
router.get('/:game_id', getCommentByGame);
router.delete('/delete/:id',verifyToken, isAdmin,removeComments);

export default router;