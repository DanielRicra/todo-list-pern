import { Router } from 'express';
import { login } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/login', login);

export default userRoutes;
