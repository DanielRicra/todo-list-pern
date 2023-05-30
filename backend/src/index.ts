import express from 'express';
import taskRoutes from './routes/taskRoutes';
import taskListRoutes from './routes/taskListRoutes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/taskList', taskListRoutes);

app.get('/', (_, res) => {
	res.send('API is too ready');
});

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
