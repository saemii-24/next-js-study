'use client';

import {use} from 'react';
import {ThemeContext} from './ThemeContext';
import {cn} from 'utils/cn';

const Button = () => {
	const {theme, toggleTheme} = use(ThemeContext);

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				'py-2 px-4 cursor-pointer text-white rounded-md mt-4',
				theme === 'dark'
					? 'bg-blue-600 hover:bg-blue-700'
					: 'bg-yellow-500 hover:bg-yellow-600',
			)}>
			테마 변경 버튼
		</button>
	);
};

export default Button;
