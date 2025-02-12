'use client';
import './globals.css';

import {useState} from 'react';

interface WrapperProps {
	children: React.ReactNode;
}

export const ErrorWrapper = ({children}: WrapperProps) => {
	const [error, setError] = useState<boolean>(false);
	if (error) throw new Error('에러가 발생했습니다!');

	return (
		<div className='flex flex-col rounded-lg mt-8 relative p-4 border border-gray-300'>
			<div className='absolute top-0 left-4 -translate-y-1/2'>
				<button
					title='Simulate an error'
					className='bg-red-950 text-white cursor-pointer rounded px-10 py-2 leading-none font-semibold text-sm hover:bg-red-900 transition'
					onClick={() => setError(true)}>
					에러 강제 발생
				</button>
			</div>
			{children}
		</div>
	);
};
