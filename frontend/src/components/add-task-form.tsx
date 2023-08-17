import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAddTaskToTaskListMutation } from '@/services/task-list';
import { useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';

const AddTaskForm = () => {
	const { taskListId } = useParams();
	const { toast } = useToast();
	const [addTask, { isLoading: isAddTaskLoading }] =
		useAddTaskToTaskListMutation();

	const errorRef = useRef<HTMLParagraphElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const addNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
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

		const newTask = {
			title: inputRef.current?.value.trim() || 'Add title',
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			taskListId: Number(taskListId!),
		};

		if (errorRef.current) {
			errorRef.current.style.display = 'none';
		}

		if (inputRef.current) {
			inputRef.current.value = '';
		}

		try {
			await addTask(newTask);
		} catch (error) {
			toast({
				title: 'Error',
				description: (error as Error).message,
				variant: 'destructive',
			});
		}
	};

	return (
		<form
			onSubmit={addNewTask}
			className="rounded-2xl p-2 flex border border-[#3e3e4b] w-full mt-3 shadow-md relative mb-3"
		>
			<button
				className={cn(
					'bg-[#F84C6F] text-sm p-1 rounded-lg active:border-[#f84cf0] active:bg-[#f84c63] active:text-white outline-none focus:outline-none',
					isAddTaskLoading && 'animate-pulse'
				)}
				type="submit"
				title="Add new task"
				disabled={isAddTaskLoading}
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
				disabled={isAddTaskLoading}
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
