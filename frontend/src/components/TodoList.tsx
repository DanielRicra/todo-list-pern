import { useState, useMemo } from 'react';

import TaskCard from './TaskCard';
import Eye from './icons/Eye';
import EyeClosed from './icons/EyeClosed';
import { useAppSelector } from '../app/hooks';
import { selectTasks } from '../features/task/tasksSlice';
import AddTaskForm from './AddTaskForm';

export const TodoList = () => {
	const [showCompleted, setShowCompleted] = useState(false);
	const tasks = useAppSelector(selectTasks);

	const filteredTasks = useMemo(() => {
		return showCompleted ? tasks : tasks.filter((task) => !task.completedAt);
	}, [showCompleted, tasks]);

	const toggleShowCompleted = () => {
		setShowCompleted((prev) => !prev);
	};

	return (
		<div className="bg-[#181820] h-full p-4 flex place-content-center">
			<div className="flex flex-col items-start justify-start sm:max-w-[400px] lg:max-w-[600px] w-full py-8">
				<div className="flex items-center justify-between w-full">
					<h2 className="font-semibold text-2xl">List name</h2>
					<div
						className="dots-icon cursor-pointer hover:bg-[#252531] rounded-md p-1 relative inline-block group"
						onClick={toggleShowCompleted}
					>
						{showCompleted ? <EyeClosed /> : <Eye />}
						<span
							style={{ color: '#f8f8f8' }}
							className="w-auto text-sm invisible bg-[#252531] text-center rounded-md px-3 py-1 absolute z-10 -left-full top-[-180%] group-hover:visible font-normal"
						>
							{showCompleted ? 'Hide' : 'Show'} Completed
						</span>
					</div>
				</div>

				<AddTaskForm />

				<h3 className="mt-3 mb-2">Tasks - {tasks.length}</h3>
				<div className="flex flex-col items-start justify-start w-full gap-2">
					{filteredTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TodoList;
