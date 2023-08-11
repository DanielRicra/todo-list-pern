import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import ProtectedRoutes from '@/components/protected-routes';
import WorkspaceLayout from './pages/workspace/layout';
import Workspace from './pages/workspace/workspace';
import { TodoList } from './components/todo-list';
import LoadingPages from './components/loading-pages';

const AuthPage = lazy(() => import('./pages/auth/auth'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoutes />,
		children: [
			{
				index: true,
				element: <Navigate to="/workspace" />,
			},
			{
				path: 'workspace',
				element: <WorkspaceLayout />,
				children: [
					{
						index: true,
						element: <Workspace />,
					},
					{
						path: ':taskListId',
						element: <TodoList />,
					},
				],
			},
		],
	},
	{
		path: 'login',
		element: (
			<Suspense fallback={<LoadingPages />}>
				<AuthPage />
			</Suspense>
		),
	},
	{
		path: 'signup',
		element: (
			<Suspense fallback={<LoadingPages />}>
				<AuthPage />
			</Suspense>
		),
	},
	{
		path: '*',
		element: <div>404</div>,
	},
]);
