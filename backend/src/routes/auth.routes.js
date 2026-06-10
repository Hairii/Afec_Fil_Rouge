import express from 'express';
import { register, login, refresh, logout, user, deleteAccount } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyRefreshToken } from '../middlewares/refresh.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', verifyRefreshToken, refresh);
router.post('/logout', logout);
router.get('/user', verifyToken, user);
router.delete('/delete', verifyToken, deleteAccount);

export default router;