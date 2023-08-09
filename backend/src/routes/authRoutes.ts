import { Router } from 'express';
import {
	login,
	logout,
	revalidateAccessToken,
	signUp,
} from '../controllers/authController';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/signup', signUp);
authRoutes.post('/token', revalidateAccessToken);
authRoutes.delete('/token', logout);

export default authRoutes;
