import { Router } from 'express';

import {
	deleteById,
	getAllTasks,
	getTaskById,
	getTasksByTaskListId,
	saveNewTask,
	updateTask,
} from '../controllers/taskController';
import { verifyAdmin, verifyToken } from '../middleware/authJWT';

const taskRoutes = Router();

taskRoutes.get('/', [verifyToken, verifyAdmin], getAllTasks);
taskRoutes.get('/:taskId', verifyToken, getTaskById);
taskRoutes.get('/taskList/:taskListId', verifyToken, getTasksByTaskListId);
taskRoutes.post('/', verifyToken, saveNewTask);
taskRoutes.put('/:taskId', verifyToken, updateTask);
taskRoutes.delete('/:taskId', verifyToken, deleteById);

export default taskRoutes;
