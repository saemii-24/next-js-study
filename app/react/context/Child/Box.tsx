'use client';

import {use} from 'react';
import {ThemeContext} from './ThemeContext';
import Button from './Button';
import {cn} from 'utils/cn';

const Box = () => {
	const shouldUseContext = false;

	let theme = 'light';

	if (shouldUseContext) {
		const context = use(ThemeContext);
		theme = context.theme;
	}

	return (
		<div
			className={cn(
				'p-4 rounded-lg flex flex-col items-center',
				theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black',
			)}>
			<p>Box - 현재 테마: {theme}</p>
			<Button />
		</div>
	);
};

export default Box;
