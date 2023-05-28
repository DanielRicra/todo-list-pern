import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { tasks } from '../db';
import { setTasks } from '../features/task/tasksSlice';
import { selectTaskLists } from '../features/task-list/taskListSlice';
import AddTaskListForm from './AddTaskListForm';

const SideBar = () => {
	const dispatch = useAppDispatch();
	const taskLists = useAppSelector(selectTaskLists);
	const [currentTaskListId, setCurrentTaskListId] = useState(
		taskLists[0]?.taskListId
	);

	const handleSelectTaskList = (taskListId: number) => {
		dispatch(
			setTasks({
				tasks: tasks.filter((task) => task.taskListId === taskListId),
				taskListId,
			})
		);
		setCurrentTaskListId(taskListId);
	};

	return (
		<div className="bg-[#21212b] h-full flex flex-col">
			<h2 className="mt-8 mb-5 text-2xl px-4 font-bold text-white">
				TaskLists
			</h2>
			{taskLists.map((taskList) => (
				<div
					key={taskList.taskListId}
					style={{
						backgroundColor:
							currentTaskListId === taskList.taskListId
								? '#333341'
								: '#21212b',
					}}
					className="py-2 px-4 hover:bg-[#333341]"
					onClick={() => handleSelectTaskList(taskList.taskListId)}
				>
					<h3>{taskList.name}</h3>
				</div>
			))}

			<div className="py-2 px-4">
				<AddTaskListForm />
			</div>
		</div>
	);
};

export default SideBar;
