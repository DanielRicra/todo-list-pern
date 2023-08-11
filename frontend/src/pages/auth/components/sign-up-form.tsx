import { email, minLength, object, string, type Output, regex } from 'valibot';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = object({
	email: string([
		minLength(1, 'Please enter your email'),
		email('The email address is badly formatted.'),
	]),
	name: string([minLength(1, 'Please enter your name')]),
	password: string([
		minLength(8, 'Your password must have 8 characters or more.'),
		regex(
			/^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
			'Your password must contain letters and numbers'
		),
	]),
	confirmPassword: string(),
});

type FormData = Output<typeof formSchema>;

const SignUpForm = () => {
	const form = useForm<FormData>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: FormData) => {
		if (values.password !== values.confirmPassword) {
			form.setError('confirmPassword', { message: 'Passwords do not match' });
			form.setFocus('confirmPassword');
			return;
		}
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[90%] sm:max-w-xs lg:max-w-sm xlg:max-w-md sm:w-full flex flex-col animate-in slide-in-from-top-32 fade-in-30 duration-500"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									className="text-lg border-gray-500 py-2 h-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="opacity-100 max-h-[200px] mb-4">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Name"
									className="text-lg border-gray-500 py-2 h-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Password"
									type="password"
									className="text-lg border-gray-500 py-2 h-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Confirm your Password"
									type="password"
									className="text-lg border-gray-500 py-2 h-auto"
									{...field}
									onChange={({ target }) => {
										if (target.value !== form.getValues('password')) {
											form.setError('confirmPassword', {
												message: 'Passwords do not match',
											});
										} else {
											form.clearErrors('confirmPassword');
										}
										form.setValue('confirmPassword', target.value);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormMessage />

				<Button type="submit" className="w-full text-lg py-2 h-auto mt-4">
					Sign Up
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
