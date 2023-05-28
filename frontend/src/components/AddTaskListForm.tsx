import { useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import type { TaskList } from '../types';
import AddButton from './buttons/AddButton';
import { addTaskList } from '../features/task-list/taskListSlice';

const AddTaskListForm = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);
	const errorRef = useRef<HTMLParagraphElement>(null);

	const addNewTaskList = (event: React.FormEvent<HTMLFormElement>) => {
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

		const newTaskList: TaskList = {
			name: inputRef.current?.value ?? 'New TaskList',
			userId: 1,
			taskListId: Math.round(Math.random() * 50000 + 50),
		};

		if (errorRef.current) {
			errorRef.current.style.display = 'none';
		}

		if (inputRef.current) {
			inputRef.current.value = '';
		}

		dispatch(addTaskList(newTaskList));
	};

	return (
		<form
			onSubmit={addNewTaskList}
			className="rounded-2xl p-2 flex border border-[#3e3e4b] w-full mt-3 shadow-md relative mb-3"
		>
			<AddButton
				title="Ass New TaskList"
				type="submit"
				bgColor="#AA28A3"
				size={18}
			/>
			<input
				ref={inputRef}
				type="text"
				placeholder="Add Task List..."
				className="bg-transparent border border-none text-white w-full px-2 outline-none rounded-2xl"
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

export default AddTaskListForm;
