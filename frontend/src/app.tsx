import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { ThemeProvider } from './providers/theme-provider';

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
		</ThemeProvider>
	);
}

export default App;
