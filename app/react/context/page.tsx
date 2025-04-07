import Box from './Child/Box';
import {ThemeProvider} from './Child/ThemeContext';

export default function App() {
	return (
		<ThemeProvider>
			<Box />
		</ThemeProvider>
	);
}
