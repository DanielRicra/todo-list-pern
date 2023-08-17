import { useForm } from 'react-hook-form';
import { minLength, string, type Output, object } from 'valibot';

import { useAddTaskListMutation } from '@/services/task-list';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSlice';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

const formSchema = object({
	name: string([minLength(1, 'Please enter a name')]),
});

type FormData = Output<typeof formSchema>;

const AddTaskListForm = () => {
	const { userId } = useAppSelector(selectUser);
	const [addTaskList, { isLoading: isAdding }] = useAddTaskListMutation();
	const { toast } = useToast();

	const form = useForm<FormData>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		try {
			await addTaskList({ name: values.name, userId }).unwrap();
			
			form.reset();
		} catch (error) {
			toast({
				title: 'Error',
				description: (error as Error).message,
				variant: 'destructive',
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-2xl p-2 flex items-center border border-[#3e3e4b] w-full mt-3 shadow-md relative mb-3"
			>
				<Button
					type="submit"
					disabled={isAdding}
					className="rounded-lg aspect-square p-0 h-7 w-7"
				>
					<PlusIcon className="h-5 w-5" />
				</Button>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full space-y-0">
							<FormControl className="flex-1">
								<input
									placeholder="Task list name"
									className="bg-transparent border-none text-white w-full px-2 outline-none rounded-2xl active:outline-none"
									disabled={isAdding}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-[#f84c4c] text-sm px-2" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default AddTaskListForm;
