import { useRef } from 'react';
import { TaskDTO } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { saveTask } from '../features/task/taskMiddleware';

const AddTaskForm = () => {
	const taskListId = useAppSelector((state) => state.tasks.value.taskListId);
	const errorRef = useRef<HTMLParagraphElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const addNewTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (inputRef.current?.value.trim() === '') {
			if (errorRef.current) {
				errorRef.current.style.display = 'block';
			}

			setTimeout(() => {
				if (errorRef.current) {
					errorRef.current.style.display = 'none';
				}
			}, 3000);
			return;
		}

		const newTask: TaskDTO = {
			title: inputRef.current?.value.trim() || 'Add title',
			createdAt: new Date().toISOString(),
			taskListId: taskListId,
			dueDate: null,
			completedAt: null,
			description: null,
		};

		if (errorRef.current) {
			errorRef.current.style.display = 'none';
		}

		if (inputRef.current) {
			inputRef.current.value = '';
		}
		dispatch(saveTask(newTask));
	};

	return (
		<form
			onSubmit={addNewTask}
			className="rounded-2xl p-2 flex border border-[#3e3e4b] w-full mt-3 shadow-md relative mb-3"
		>
			<button
				className="bg-[#F84C6F] text-sm p-1 rounded-lg active:border-[#f84cf0] active:bg-[#f84c63] active:text-white outline-none focus:outline-none"
				type="submit"
				title="Add new task"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={20}
					height={20}
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 5l0 14"></path>
					<path d="M5 12l14 0"></path>
				</svg>
			</button>

			<input
				placeholder="Add a task..."
				autoFocus
				type="text"
				ref={inputRef}
				className="flex-1 bg-transparent text-white px-2 outline-none border-none"
			/>

			<p
				style={{ display: 'none' }}
				ref={errorRef}
				className="text-[#f84c4c] text-sm absolute bottom-0 right-2 translate-y-full"
			>
				Please fill the field
			</p>
		</form>
	);
};

export default AddTaskForm;
