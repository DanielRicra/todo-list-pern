import { Router } from 'express';
import {
	deleteTaskListById,
	getAllTaskLists,
	getTaskListById,
	getTaskListsByUserId,
	saveNewTaskList,
	updateTaskList,
} from '../controllers/taskListController';
import { verifyAdmin, verifyToken } from '../middleware/authJWT';

const taskListRoutes = Router();

taskListRoutes.get('/', [verifyToken, verifyAdmin], getAllTaskLists);

taskListRoutes.get('/:taskListId', verifyToken, getTaskListById);

taskListRoutes.get('/user/:userId', verifyToken, getTaskListsByUserId);

taskListRoutes.post('/', verifyToken, saveNewTaskList);

taskListRoutes.delete('/:taskListId', verifyToken, deleteTaskListById);

taskListRoutes.put('/:taskListId', verifyToken, updateTaskList);

export default taskListRoutes;
