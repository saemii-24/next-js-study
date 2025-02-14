import {ReactNode} from 'react';

export default function Layout({
	children,
	article, //@으로 되어있는 것들은 따로 import 안해도 됨
	users,
}: {
	children: ReactNode;
	article: ReactNode;
	users: ReactNode;
}) {
	return (
		<>
			<nav className='text-2xl font-semibold mt-3'>대시보드</nav>
			{children}
			{users}
			{article}
		</>
	);
}
