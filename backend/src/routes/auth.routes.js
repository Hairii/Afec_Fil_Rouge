import express from 'express';
import{register, login, logout, user } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken,logout);
router.get('/user', verifyToken, user );

export default router;