import { Router } from 'express';
import { deleteTaskListById, getAllTaskLists, getTaskListById, getTaskListsByUserId, saveNewTaskList, updateTaskList } from '../controllers/taskListController';

const taskListRoutes = Router();

taskListRoutes.get('/', getAllTaskLists);

taskListRoutes.get('/:taskListId', getTaskListById);

taskListRoutes.get('/user/:userId', getTaskListsByUserId);

taskListRoutes.post('/', saveNewTaskList);

taskListRoutes.delete('/:taskListId', deleteTaskListById);

taskListRoutes.put('/:taskListId', updateTaskList);

export default taskListRoutes;
