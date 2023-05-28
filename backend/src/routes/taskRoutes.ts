import { Router } from 'express';
import {
	deleteById,
	getAllTasks,
	getTaskById,
	getTasksByTaskListId,
	saveNewTask,
	updateTask,
} from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.get('/', getAllTasks);

taskRoutes.get('/:taskId', getTaskById);

taskRoutes.get('/taskList/:taskListId', getTasksByTaskListId);

taskRoutes.post('/', saveNewTask);

taskRoutes.put('/:taskId', updateTask);

taskRoutes.delete('/:taskId', deleteById);

export default taskRoutes;
