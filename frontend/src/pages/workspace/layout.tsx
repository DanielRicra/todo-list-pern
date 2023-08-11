import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';
import { useAppDispatch } from '@/app/hooks';
import { fetchTaskListsByUserId } from '@/features/task-list/taskListMiddleware';

const WorkspaceLayout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTaskListsByUserId(1));
	}, []);

	return (
		<>
			<div className="min-h-screen w-[260px]">
				<SideBar />
			</div>

			<div className="min-h-screen flex-1">
				<NavBar />
				<Outlet />
			</div>
		</>
	);
};
export default WorkspaceLayout;
