import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddTaskListForm from './AddTaskListForm';
import { fetchTasksByTaskListId } from '../features/task/taskMiddleware';

const SideBar = () => {
	const dispatch = useAppDispatch();
	const { status, value: taskLists } = useAppSelector((state) => state.taskList);
	const [currentTaskListId, setCurrentTaskListId] = useState<number>(taskLists[0]?.taskListId || 1);

	const handleSelectTaskList = (taskListId: number) => {	
		setCurrentTaskListId(taskListId);
	};

	useEffect(() => {
		const promise = dispatch(fetchTasksByTaskListId(currentTaskListId));

		return () => {
			promise.abort();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTaskListId]);

	return (
		<div className="bg-[#21212b] h-full flex flex-col">
			<h2 className="mt-8 mb-5 text-2xl px-4 font-bold text-white">
				TaskLists
			</h2>
			{status === 'pending' && <p>Loading...</p>}
			{status === 'rejected' && <p>Error!</p>}
			{status === 'fulfilled' && taskLists.map((taskList) => (
				<div
					key={taskList.taskListId}
					style={{
						backgroundColor:
							currentTaskListId === taskList.taskListId
								? '#333341'
								: '#21212b',
					}}
					className="py-2 px-4 hover:bg-[#333341]"
					onClick={() => handleSelectTaskList(taskList.taskListId || 0)}
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
