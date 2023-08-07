import 'dotenv/config';

import app from './app';

const port = process.env.PORT ?? 3001;
const DEPLOY_URL = process.env.DEPLOY_URL ?? `http://localhost:${port}`;

app.listen(port, () => {
	console.log(`Server is running on port ${DEPLOY_URL}`);
});
