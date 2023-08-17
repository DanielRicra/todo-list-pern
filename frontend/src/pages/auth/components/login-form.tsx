import { email, minLength, object, string, type Output } from 'valibot';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
import { login } from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types';
import { useUserActions } from '@/hooks/useUserActions';

const formSchema = object({
	email: string([
		minLength(1, 'Please enter your email'),
		email('The email address is badly formatted.'),
	]),
	password: string([
		minLength(1, 'Your password is required.'),
	]),
});

type FormData = Output<typeof formSchema>;

const LoginForm = () => {
	const { toast } = useToast();
	const { saveUser } = useUserActions();
	const navigate = useNavigate();

	const form = useForm<FormData>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		try {
			const authData = await login(values.email, values.password);
			const decoded = jwtDecode<User>(authData.accessToken);
			saveUser({
				...decoded,
				accessToken: authData.accessToken,
				refreshToken: authData.refreshToken,
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
				<Button type="submit" className="w-full text-lg py-2 h-auto mt-4">
					Login
				</Button>
			</form>
		</Form>
	);
};
export default LoginForm;
