import { Router } from 'express';

import {
	deleteById,
	getAllTasks,
	getTaskById,
	saveNewTask,
	updateTask,
} from '../controllers/taskController';
import { verifyAdmin, verifyToken } from '../middleware/authJWT';

const taskRoutes = Router();

taskRoutes.get('/', [verifyToken, verifyAdmin], getAllTasks);
taskRoutes.get('/:taskId', verifyToken, getTaskById);
taskRoutes.post('/', verifyToken, saveNewTask);
taskRoutes.put('/:taskId', verifyToken, updateTask);
taskRoutes.delete('/:taskId', verifyToken, deleteById);

export default taskRoutes;
