import express from 'express';
import { addComments, getCommentByGame, removeComments} from '../controllers/comments.controller.js';

const router = express.Router();

router.post('/add', addComments);
router.get('/comments/:game_id', getCommentByGame);
router.delete('/delete/:id', removeComments);

export default router;