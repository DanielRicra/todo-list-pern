import {
	DotsHorizontalIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useDeleteTaskListMutation } from '@/services/task-list';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface DropdownTaskListProps {
	id: number;
}

const DropdownTaskList: React.FC<DropdownTaskListProps> = ({ id }) => {
	const [deleteTaskList, { isLoading: isDeleting }] =
		useDeleteTaskListMutation();
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			await deleteTaskList(id);
			toast({
				title: 'Success',
				description: 'Task list deleted',
			});
			navigate('/workspace');
		} catch (error) {
			toast({
				title: 'Error',
				description: (error as Error).message,
				variant: 'destructive',
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="outline"
					size="icon"
					title="menu"
					className="rounded-xl border border-[#454545] hover:border-primary"
				>
					<DotsHorizontalIcon className="h-6 w-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-[#2e2e3b] border-[#454545]">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-[#454545]" />
				<DropdownMenuItem className="flex justify-between text-base hover:bg-[#3c3c4b]">
					Edit
					<Pencil2Icon className="h-5 w-5" />
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex justify-between text-base hover:bg-[#3c3c4b] text-red-400 group hover:text-red-400"
					onClick={handleDelete}
					disabled={isDeleting}
				>
					Delete
					<TrashIcon className="h-5 w-5 fill-red-400 group-hover:fill-red-400" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default DropdownTaskList;
