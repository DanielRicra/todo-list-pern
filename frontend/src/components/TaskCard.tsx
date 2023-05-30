import { useState, useRef, useEffect } from 'react';
import { TaskDTO } from '../types';
import TaskCardContent from './TaskCardContent';

const TaskCard = ({ task }: { task: TaskDTO }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	const toggleShowDropdown = () => {
		setIsDropdownOpen((p) => !p);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current) {
				if (!ref.current.contains(event.target as Node)) {
					setIsDropdownOpen(false);
				}
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	return (
		<TaskCardContent
			task={task}
			ref={ref}
			toggleShowDropdown={toggleShowDropdown}
			isDropdownOpen={isDropdownOpen}
		/>
	);
};

export default TaskCard;
