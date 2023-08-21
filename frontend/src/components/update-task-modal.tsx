import { useState, useEffect } from 'react';
import format from 'date-fns/format';

import type { Task, TaskDTO } from '../types';
import { convertTaskDTOToTask, convertTaskToTaskDTO } from '../utils/taskUtils';
import { Button } from './ui/button';
import { useUpdateTaskFromTaskListMutation } from '@/services/task-list';
import { useToast } from './ui/use-toast';

type UpdateTaskModalProps = {
	task: TaskDTO;
	closeUpdateModal: () => void;
};

const UpdateTaskModal = ({ task, closeUpdateModal }: UpdateTaskModalProps) => {
	const [taskForm, setTaskForm] = useState<Task>(convertTaskDTOToTask(task));
	const [updateTask, { isLoading: isUpdatingTask }] =
		useUpdateTaskFromTaskListMutation();
	const { toast } = useToast();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setTaskForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdateTask = async (event: React.MouseEvent) => {
		event.preventDefault();
		try {
			await updateTask(convertTaskToTaskDTO(taskForm)).unwrap();
			toast({
				title: 'Task updated successfully',
				duration: 3500,
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: (error as Error).message,
				variant: 'destructive',
			});
		}

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
		<div className="w-[500px] rounded-2xl bg-[#21212b] p-2 dark:text-white">
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
						value={
							taskForm.dueDate
								? format(taskForm.dueDate, 'yyyy-MM-dd')
								: ''
						}
						placeholder="Due Date"
						className="flex-1 bg-transparent outline-none border border-[#3e3e4b] p-2 rounded-xl"
						onChange={handleDateChange}
					/>
				</div>

				<div className="flex justify-between">
					<Button
						type="submit"
						variant="outline"
						disabled={isUpdatingTask}
						onClick={(e) => handleUpdateTask(e)}
						className="hover:bg-[#D63691] border-[#B32C6C]"
					>
						Update
					</Button>
					<Button
						type="button"
						variant="destructive"
						onClick={closeUpdateModal}
						className="bg-[#cc1111]"
						disabled={isUpdatingTask}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UpdateTaskModal;
