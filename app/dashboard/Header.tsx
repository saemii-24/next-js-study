import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
		<nav>
			<Link href='/dashboard'>Dashbard</Link>
			<Link href='/dashboard/settings'>Settings</Link>
		</nav>
	);
};

export default Header;
