import { Outlet } from 'react-router-dom';

import NavBar from '@/components/nav-bar';
import SideBar from '@/components/side-bar';

const WorkspaceLayout = () => {
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
