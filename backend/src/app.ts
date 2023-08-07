import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import taskRoutes from './routes/taskRoutes';
import taskListRoutes from './routes/taskListRoutes';
import { errorHandler } from './middleware/errorHandler';

const port = process.env.PORT ?? 3001;
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
const DEPLOY_URL = process.env.DEPLOY_URL ?? `http://localhost:${port}`;

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: CLIENT_ORIGIN_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		maxAge: 300,
	})
);
app.use(morgan('dev'));

app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/taskList', taskListRoutes);

app.get('/', async (_, res, next) => {
	res.status(200).json({
		message: 'Welcome to the task manager',
		tasksUrl: `${DEPLOY_URL}/api/v1/task`,
		taskListsUrl: `${DEPLOY_URL}/api/v1/taskList`,
	});
});

app.use(errorHandler);

export default app;
