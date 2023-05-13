import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('API is ready');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
