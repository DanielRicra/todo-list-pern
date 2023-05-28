import { TaskDTO, TaskList } from './types';

export const tasks: TaskDTO[] = [
	{
		id: 1,
		title: 'Write a 500-word essay on the history of the American Revolution',
		description:
			'This essay should be well-researched and well-written. It should be formatted according to MLA style.',
		dueDate: new Date('2023-05-17').toLocaleDateString(),
		taskListId: 1,
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 2,
		title: 'Complete a math test',
		dueDate: new Date('2023-05-18').toLocaleDateString(),
		taskListId: 1,
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 3,
		title: 'Write a 10-page paper on the causes of the Civil War',
		description:
			'This paper should be well-researched and well-written. It should be formatted according to APA style.',
		dueDate: new Date('2023-05-20').toLocaleDateString(),
		taskListId: 1,
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 4,
		title: 'Read a chapter of your history textbook',
		dueDate: new Date('2023-05-21').toLocaleDateString(),
		taskListId: 1,
		createdAt: new Date().toLocaleDateString(),
		completedAt: new Date('2023-05-14').toLocaleDateString(),
	},
	{
		id: 5,
		title: 'Study for your science test',
		description:
			'This test will cover the material that was covered in class this week.',
		dueDate: new Date('2023-05-22').toLocaleDateString(),
		taskListId: 1,
		createdAt: new Date().toLocaleDateString(),
	}, 
	{
		id: 6,
		title: 'Clean the house',
		dueDate: new Date('2023-05-17').toLocaleDateString(),
		taskListId: 2,
		createdAt: new Date().toLocaleDateString(),
	}, {
		id: 7,
		title: 'Wash the dishes',
		dueDate: new Date('2023-05-18').toLocaleDateString(),
		taskListId: 2,
		createdAt: new Date().toLocaleDateString(),	
	}
];

export const taskLists: TaskList[] = [
	{
		taskListId: 1,
		name: 'University',
		userId: 1,
	},
	{
		taskListId: 2,
		name: 'Home',
		userId: 1,
	},
];
