import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Eye from './icons/Eye';
import EyeClosed from './icons/EyeClosed';
import AddTaskForm from './add-task-form';
import TaskCard from './task-card/task-card';
import { useGetTaskListByIdQuery } from '@/services/task-list';
import { TaskDTO } from '@/types';

export const TodoList = () => {
	const { taskListId } = useParams();

	const {
		data: taskList,
		isLoading,
		isError,
	} = useGetTaskListByIdQuery(taskListId ?? '');

	const [showCompleted, setShowCompleted] = useState(false);

	const filteredTasks = useMemo(() => {
		return showCompleted ? taskList?.tasks : taskList?.tasks.filter((task: TaskDTO) => !task.completedAt);
	}, [showCompleted, taskList]);

	const toggleShowCompleted = () => {
		setShowCompleted((prev) => !prev);
	};

	const completedTasksCount = taskList?.tasks.filter((t: TaskDTO) =>
		Boolean(t.completedAt)
	).length;

	return (
		<div className="bg-[#181820] h-full p-4 flex place-content-center text-white">
			<div className="flex flex-col items-start justify-start sm:max-w-[400px] lg:max-w-[600px] w-full py-8">
				<div className="flex items-center justify-between w-full">
					<h2 className="font-semibold text-2xl">
						{taskList?.name}- {taskListId}
					</h2>
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
					<h3 className="">Tasks - {taskList?.tasks.length}</h3>
					<div className="h-[8px] bg-[#34343f] rounded-md flex-1">
						<div
							className="h-full bg-[#AA28A3] rounded-md"
							style={{
								width: `${(completedTasksCount / taskList?.tasks.length) * 100}%`,
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start justify-start w-full gap-2">
					{isLoading ? (
						<div className="animate-pulse text-2xl">Loading</div>
					) : isError ? (
						<div className="text-2xl text-red-500">Error Loading Tasks Data...</div>
					) : filteredTasks?.map((task: TaskDTO) => (
							<TaskCard key={task.taskId} task={task} />
						))}
				</div>
			</div>
		</div>
	);
};
