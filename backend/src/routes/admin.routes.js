import express from 'express';
import {
  getAdminGames,
  deletedGame,
  patchGame,
  getReportedComments,
  unReportedComment,
  deletedComments,
  deletedUser,
} from '../controllers/admin.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/games', verifyToken, isAdmin, getAdminGames);
router.delete('/games/:id', verifyToken, isAdmin, deletedGame);
router.patch('/games/:id', verifyToken, isAdmin, patchGame);
router.get('/comments', verifyToken, isAdmin, getReportedComments);
router.patch('/comments/:id', verifyToken, isAdmin, unReportedComment);
router.delete('/comments/:id', verifyToken, isAdmin, deletedComments);
router.delete('/users/:id', verifyToken, isAdmin, deletedUser);

export default router;