import { Router } from 'express';
import { getUserById, getUsers } from '../controllers/userController';
import { verifyAdmin, verifyToken } from '../middleware/authJWT';

const userRoutes = Router();

userRoutes.get('/', [verifyToken, verifyAdmin], getUsers);
userRoutes.get('/:userId', verifyToken, getUserById);

export default userRoutes;
