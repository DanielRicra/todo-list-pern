import { Router } from 'express';
import { deleteTaskListById, getAllTaskLists, saveNewTaskList, updateTaskList } from '../controllers/taskListController';

const taskListRoutes = Router();

taskListRoutes.get('/', getAllTaskLists);

taskListRoutes.post('/', saveNewTaskList);

taskListRoutes.delete('/:taskListId', deleteTaskListById);

taskListRoutes.put('/:taskListId', updateTaskList);

export default taskListRoutes;
