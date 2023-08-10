import { useEffect, useState, forwardRef, useRef } from 'react';
import formatDistance from 'date-fns/formatDistance';

import CaretRight from '../icons/CaretRight';
import Dots from '../icons/Dots';
import { Task, TaskCardProps } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { updateTask } from '../../features/task/taskMiddleware';
import {
	convertTaskDTOToTask,
	convertTaskToTaskDTO,
} from '../../utils/taskUtils';
import DropDownMenu from './drop-down-menu';
import UpdateTaskModal from '../update-task-modal';

const TaskCardContent = forwardRef<HTMLDivElement, TaskCardProps>(
	({ task, isDropdownOpen, toggleShowDropdown }, ref) => {
		const dispatch = useAppDispatch();
		const [taskForm, setTaskForm] = useState<Task>(
			convertTaskDTOToTask(task)
		);
		const modalRef = useRef<HTMLDialogElement>(null);

		const openUpdateModal = () => {
			modalRef.current?.showModal();
		};

		const closeUpdateModal = () => {
			modalRef.current?.close();
		};

		const handleCompletedToggle = (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			const completedAt = e.target.checked ? new Date().toISOString() : null;

			const updatedTask = { ...convertTaskToTaskDTO(taskForm), completedAt };

			dispatch(updateTask(updatedTask));
		};

		useEffect(() => {
			setTaskForm(convertTaskDTOToTask(task));
		}, [task]);

		return (
			<>
				<div className="flex w-full hover:bg-[#252531] rounded-lg p-2 flex-col justify-start items-start relative">
					{task.description && (
						<>
							<input
								type="checkbox"
								id={`accordion-caret-${task.taskId}`}
								className="cursor-pointer absolute opacity-0 peer/accordion -z-10"
								title="Done"
							/>
							<label
								htmlFor={`accordion-caret-${task.taskId}`}
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
							htmlFor={`input-done-${task.taskId}`}
							className="ml-2 cursor-pointer relative flex items-center text-base"
						>
							<input
								type="checkbox"
								id={`input-done-${task.taskId}`}
								className="cursor-pointer absolute opacity-0 peer/completed -z-10"
								title="Completed"
								name="completed"
								onChange={handleCompletedToggle}
								checked={!!taskForm.completedAt}
							/>
							<span className="border-2 border-[#F84C6F] border-solid peer-checked/completed:text-white bg-transparent peer-checked/completed:bg-[#F84C6F] peer-checked/completed:bg-[url('src/assets/check.svg')] peer-checked/completed:bg-no-repeat peer-checked/completed:bg-center block rounded-lg -top-[2px] w-[22px] h-[22px] pointer-events-none transition-all duration-300 ease-in-out"></span>
						</label>

						<p className="flex-1">{taskForm.title}</p>

						<div ref={ref}>
							<div
								onClick={toggleShowDropdown}
								style={{
									borderColor: isDropdownOpen ? '#F84C6F' : '#454545',
								}}
								className="flex items-center cursor-pointer hover:border-[#F84C6F] border border-solid rounded-xl p-1"
							>
								<Dots fill="#f5f2f2" />
							</div>

							{isDropdownOpen && (
								<DropDownMenu
									toggleShowDropdown={toggleShowDropdown}
									openUpdateModal={openUpdateModal}
								/>
							)}
						</div>
					</div>

					{task.description && (
						<p className="h-0 px-2 py-0 ml-7 overflow-hidden transition-all duration-200 ease-linear peer-checked/accordion:h-auto peer-checked/accordion:p-1 peer-checked/accordion:overflow-visible">
							{task.description}
						</p>
					)}

					{taskForm.dueDate && (
						<span className="ml-7">
							Due in {formatDistance(new Date(taskForm.dueDate), new Date())}
						</span>
					)}
				</div>

				<dialog
					ref={modalRef}
					className="p-0 bg-transparent backdrop:bg-[#25253127]"
				>
					<UpdateTaskModal
						task={task}
						closeUpdateModal={closeUpdateModal}
					/>
				</dialog>
			</>
		);
	}
);

export default TaskCardContent;
