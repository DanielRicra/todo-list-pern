import { NavLink, useNavigate, useParams } from 'react-router-dom';

import AddTaskListForm from './add-task-list-form';
import { useGetTaskListsByUserIdQuery } from '@/services/task-list';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSlice';
import { useEffect } from 'react';

const skeletons = [true, true, true];

const SideBar = () => {
	const navigate = useNavigate();
	const { taskListId } = useParams();
	const { userId } = useAppSelector(selectUser);

	const { data, isLoading, isError } = useGetTaskListsByUserIdQuery(userId);

	useEffect(() => {
		if (!taskListId && data && data?.length > 0) {
			navigate(`/workspace/${data.at(0)?.taskListId}`);
		}
	}, [data]);

	return (
		<div className="bg-[#21212b] h-full flex flex-col">
			<h2 className="mt-8 mb-5 text-2xl px-4 font-bold text-white">
				TaskLists
			</h2>

			{isLoading ? (
				skeletons.map((_a, i) => (
					<p className="py-2 px-4" key={i}>
						<span className="h-9 w-full block rounded-md bg-gray-600 animate-pulse" />
					</p>
				))
			) : isError ? (
				<p className="py-2 px-4 text-red-500">Could fetch task lists.</p>
			) : (
				data?.map((taskList) => (
					<NavLink
						to={`/workspace/${taskList.taskListId}`}
						key={taskList.taskListId}
						className="py-2 px-4 hover:bg-[#333341] active:bg-[#333341]"
					>
						<p>{taskList.name}</p>
					</NavLink>
				))
			)}

			<div className="py-2 px-4">
				<AddTaskListForm />
			</div>
		</div>
	);
};

export default SideBar;
