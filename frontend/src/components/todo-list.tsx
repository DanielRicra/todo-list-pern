import { useState, useMemo } from 'react';

import Eye from './icons/Eye';
import EyeClosed from './icons/EyeClosed';
import { useAppSelector } from '../app/hooks';
import AddTaskForm from './add-task-form';
import TaskCard from './task-card/TaskCard';

export const TodoList = () => {
	const [showCompleted, setShowCompleted] = useState(false);
	const {
		value: { name: TaskListName, tasks },
		status,
		error,
	} = useAppSelector((state) => state.tasks);

	const filteredTasks = useMemo(() => {
		return showCompleted ? tasks : tasks.filter((task) => !task.completedAt);
	}, [showCompleted, tasks]);

	const toggleShowCompleted = () => {
		setShowCompleted((prev) => !prev);
	};

	const completedTasksCount = tasks.filter((t) =>
		Boolean(t.completedAt)
	).length;

	return (
		<div className="bg-[#181820] h-full p-4 flex place-content-center">
			<div className="flex flex-col items-start justify-start sm:max-w-[400px] lg:max-w-[600px] w-full py-8">
				<div className="flex items-center justify-between w-full">
					<h2 className="font-semibold text-2xl">{TaskListName}</h2>
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

				<div className="flex gap-4 items-center w-full mt-3 mb-2">
					<h3 className="">Tasks - {tasks.length}</h3>
					<div className="h-[8px] bg-[#34343f] rounded-md flex-1">
						<div
							className="h-full bg-[#AA28A3] rounded-md"
							style={{
								width: `${(completedTasksCount / tasks.length) * 100}%`,
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start justify-start w-full gap-2">
					{status === 'pending' && (
						<div className="animate-pulse text-2xl">Loading</div>
					)}
					{status === 'rejected' && (
						<div className="text-2xl text-red-500">{error}</div>
					)}
					{status === 'fulfilled' &&
						filteredTasks.map((task) => (
							<TaskCard key={task.taskId} task={task} />
						))}
				</div>
			</div>
		</div>
	);
};

export default TodoList;
