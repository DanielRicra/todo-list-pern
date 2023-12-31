import { ModeToggle } from './mode-toggle';
import SearchTask from './search-task';

const NavBar = () => {
	return (
		<nav className="flex items-center bg-[#21212b] justify-end px-6 py-2 gap-2 shadow-lg z-10 sticky">
			<SearchTask />
			<div>🔔</div>
			<ModeToggle />
			<div className="avatar w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
				<span className="text-white font-medium text-base">DR</span>
			</div>
		</nav>
	);
};

export default NavBar;
