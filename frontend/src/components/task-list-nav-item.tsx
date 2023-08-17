import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { TaskListWithId } from '@/types';
import DropdownTaskList from './dropdown-task-list';

interface TaskListNavItemProps {
	taskList: TaskListWithId;
	className?: string;
}

const TaskListNavItem: React.FC<TaskListNavItemProps> = ({
	taskList,
	className,
}) => {
	return (
		<NavLink
			to={`/workspace/${taskList.taskListId}`}
			key={taskList.taskListId}
			className={cn(
				'py-2 px-4 hover:bg-[#333341] [&.active]:bg-[#333341] flex justify-between items-center',
				className
			)}
		>
			<p>{taskList.name}</p>

			<DropdownTaskList id={taskList.taskListId} />
		</NavLink>
	);
};
export default TaskListNavItem;
