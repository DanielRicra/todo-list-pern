import { useState, useEffect } from 'react';
import format from 'date-fns/format';

import type { Task, TaskDTO } from '../types';
import { convertTaskDTOToTask, convertTaskToTaskDTO } from '../utils/taskUtils';
import { useAppDispatch } from '../app/hooks';
import { updateTask } from '../features/task/taskMiddleware';

type UpdateTaskModalProps = {
	task: TaskDTO;
	closeUpdateModal: () => void;
};

const UpdateTaskModal = ({ task, closeUpdateModal }: UpdateTaskModalProps) => {
	const [taskForm, setTaskForm] = useState<Task>(convertTaskDTOToTask(task));
	const dispatch = useAppDispatch();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setTaskForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdateTask = (event: React.MouseEvent) => {
		event.preventDefault();
		dispatch(updateTask(convertTaskToTaskDTO(taskForm)));

		closeUpdateModal();
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setTaskForm((prev) => ({
			...prev,
			dueDate: value === '' ? undefined : new Date(`${value}T00:00:00`),
		}));
	};

	useEffect(() => {
		setTaskForm(convertTaskDTOToTask(task));
	}, [task]);

	return (
		<div className="w-[500px] rounded-2xl bg-[#21212b] p-2">
			<form className="p-5 rounded-2xl bg-[#21212b] gap-3 flex flex-col">
				<div className="flex flex-col">
					<label
						htmlFor={`title-${task.taskId}`}
						className="text-base font-semibold"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						id={`title-${task.taskId}`}
						value={taskForm.title}
						placeholder="Write a task"
						className="flex-1 bg-transparent outline-none border border-[#3e3e4b] p-2 rounded-xl"
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor={`description-${task.taskId}`}
						className="text-base font-semibold"
					>
						Description
					</label>
					<textarea
						name="description"
						id={`description-${task.taskId}`}
						value={taskForm.description ?? ''}
						rows={3}
						placeholder="Write a description..."
						className="flex-1 bg-transparent outline-none border border-[#3e3e4b] p-2 rounded-xl"
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor={`dueDate-${task.taskId}`}
						className="text-base font-semibold"
					>
						DueDate
					</label>
					<input
						type="date"
						name="dueDate"
						id={`dueDate-${task.taskId}`}
						value={taskForm.dueDate ? format(taskForm.dueDate, 'yyyy-MM-dd') : ''}
						placeholder="Due Date"
						className="flex-1 bg-transparent outline-none border border-[#3e3e4b] p-2 rounded-xl"
						onChange={handleDateChange}
					/>
				</div>

				<div className="flex justify-between">
					<button
						type="submit"
						onClick={(e) => handleUpdateTask(e)}
						className="hover:bg-[#D63691] border-[#B32C6C] hover:outline-none hover:border-transparent transition-colors duration-300"
					>
						Update
					</button>
					<button
						type="button"
						onClick={closeUpdateModal}
						className="bg-[#cc1111] border-transparent hover:border-transparent hover:brightness-125 transition-colors duration-300"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateTaskModal;
