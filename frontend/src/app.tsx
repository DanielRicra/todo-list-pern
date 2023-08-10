import { useEffect } from 'react';

import './App.css';
import { useAppDispatch } from './app/hooks';
import NavBar from './components/nav-bar';
import SideBar from './components/side-bar';
import TodoList from './components/todo-list';
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
