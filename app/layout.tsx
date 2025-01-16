import './globals.css';
import Provider from './Provider';
import {Noto_Sans_KR} from 'next/font/google';

const noto = Noto_Sans_KR({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='ko' className={noto.className}>
			<body className='mx-auto min-h-screen w-[360px] border border-x-gray-200 px-4 py-6'>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
