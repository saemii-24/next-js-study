import {ReactNode} from 'react';

export default function Layout({
	children,
	usage,
}: {
	children: ReactNode;
	usage: ReactNode;
}) {
	return (
		<>
			<nav className='text-2xl font-semibold mt-3'>Framer-motion</nav>
			{children}
			{usage}
		</>
	);
}
