import { useEffect } from 'react';

import './App.css';
import { useAppDispatch } from './app/hooks';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import TodoList from './components/TodoList';
import { setTasks } from './features/task/tasksSlice';
import { tasks, taskLists } from './db';
import { setTaskLists } from './features/task-list/taskListSlice';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setTaskLists(taskLists));

		dispatch(
			setTasks({
				tasks: tasks.filter((task) => task.taskListId === taskLists[0].taskListId),
				taskListId: taskLists[0].taskListId,
			})
		);
	}, [dispatch]);

	return (
		<>
			<div className="min-h-screen w-[260px]">
				<SideBar />
			</div>

			<div className="min-h-screen flex-1">
				<NavBar />
				<TodoList />
			</div>
		</>
	);
}

export default App;
