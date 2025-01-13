import type {Metadata} from 'next';
import '../styles/global.css';
import Provider from './Provider';
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='ko'>
			<body className=''>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
