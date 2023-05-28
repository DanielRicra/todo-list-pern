import { Router } from 'express';
import {
	deleteById,
	getAllTasks,
	getTaskById,
	saveNewTask,
	updateTask,
} from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.get('/', getAllTasks);

taskRoutes.get('/:taskId', getTaskById);

taskRoutes.post('/', saveNewTask);

taskRoutes.put('/:taskId', updateTask);

taskRoutes.delete('/:taskId', deleteById);

export default taskRoutes;
