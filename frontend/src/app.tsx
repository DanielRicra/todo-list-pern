import { useEffect } from 'react';

import './App.css';
import { useAppDispatch } from './app/hooks';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import TodoList from './components/TodoList';
import { fetchTaskListsByUserId } from './features/task-list/taskListMiddleware';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTaskListsByUserId(1));
	}, []);

	return (
		<>
			<div className="min-h-screen w-[260px]">
				<SideBar  />
			</div>

			<div className="min-h-screen flex-1">
				<NavBar />
				<TodoList />
			</div>
		</>
	);
}

export default App;
