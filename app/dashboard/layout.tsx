import {ReactNode} from 'react';
import Header from './Header';

export default function DashboardLayout({
	children,
	team,
	analytics,
}: {
	children: ReactNode;
	team: ReactNode;
	analytics: ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
			<div className='flex'>
				{team}
				{analytics}
			</div>
		</div>
	);
}
