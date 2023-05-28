import { useEffect, useState } from 'react';
import CaretRight from './icons/CaretRight';
import Dots from './icons/Dots';
import { Task, TaskProps } from '../types';
import { useAppDispatch } from '../app/hooks';
import { updateTask } from '../features/task/tasksSlice';
import { convertTaskDTOToTask, convertTaskToTaskDTO } from '../utils/taskUtils';

const TaskCard = ({ task }: TaskProps) => {
	const dispatch = useAppDispatch();
	const [taskForm, setTaskForm] = useState<Task>(convertTaskDTOToTask(task));

	const handleCompletedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const completedAt = e.target.checked ? new Date().toISOString() : undefined;
		dispatch(updateTask({ ...convertTaskToTaskDTO(taskForm), completedAt }));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target; 
		dispatch(updateTask({ ...convertTaskToTaskDTO(taskForm), [name]: value }));
	};

	useEffect(() => {
		setTaskForm(convertTaskDTOToTask(task));
	}, [task]);

	return (
		<div className="flex w-full hover:bg-[#252531] rounded-lg p-2 flex-col justify-start items-start relative">
			{task.description && (
				<>
					<input
						type="checkbox"
						id={`accordion-caret-${task.id}`}
						className="cursor-pointer absolute opacity-0 peer/accordion -z-10"
						title="Done"
					/>
					<label
						htmlFor={`accordion-caret-${task.id}`}
						className="absolute left-[-10px] z-10 peer-checked/accordion:rotate-90 transition-all duration-200 ease-linear"
					>
						<CaretRight
							fill="none"
							className="h-6 w-6 flex"
							strokeWidth="2"
						/>
					</label>
				</>
			)}

			<div className="flex items-center justify-between w-full gap-2 mb-2">
				<label
					htmlFor={`input-done-${task.id}`}
					className="ml-2 cursor-pointer relative flex items-center text-base"
				>
					<input
						type="checkbox"
						id={`input-done-${task.id}`}
						className="cursor-pointer absolute opacity-0 peer/completed -z-10"
						title="Completed"
						name="completed"
						onChange={handleCompletedToggle}
						checked={!!taskForm.completedAt}
					/>
					<span className="border-2 border-[#F84C6F] border-solid peer-checked/completed:text-white bg-transparent peer-checked/completed:bg-[#F84C6F] peer-checked/completed:bg-[url('src/assets/check.svg')] peer-checked/completed:bg-no-repeat peer-checked/completed:bg-center block rounded-lg -top-[2px] w-[22px] h-[22px] pointer-events-none transition-all duration-300 ease-in-out"></span>
				</label>

				<input
					type="text"
					name="title"
					value={taskForm.title}
					placeholder="Write a task"
					className="flex-1 bg-transparent outline-none"
					onChange={handleInputChange}
				/>

				<Dots fill="#f5f2f2" />
			</div>
			{task.description && (
				<p className="h-0 px-2 py-0 ml-7 overflow-hidden transition-all duration-200 ease-linear peer-checked/accordion:h-auto peer-checked/accordion:p-1 peer-checked/accordion:overflow-visible">
					{task.description}
				</p>
			)}
			{taskForm.dueDate && (
				<span className="ml-7">{taskForm.dueDate.toLocaleDateString()}</span>
			)}
			{taskForm.updatedAt && (
				<span className="ml-7">{taskForm.updatedAt.toLocaleDateString()}</span>
			)}
		</div>
	);
};

export default TaskCard;
