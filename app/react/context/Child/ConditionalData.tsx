'use client';

import {use, useState, Suspense} from 'react';
import {ThemeContext} from './ThemeContext';
import {cn} from 'utils/cn';

// Simulate data fetching
const fetchData = (id: number) => {
	return new Promise<{id: number; data: string}>((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				data: `Fetched data for ID: ${id}`,
			});
		}, 1000);
	});
};

const DataDisplay = ({shouldFetch}: {shouldFetch: boolean}) => {
	// This will only be called when shouldFetch is true
	const data = shouldFetch ? use(fetchData(1)) : null;

	return (
		<div className={cn('p-4 rounded-lg')}>
			{data ? <p>Data: {data.data}</p> : <p>Data fetching is disabled</p>}
		</div>
	);
};

const ConditionalData = () => {
	const [shouldFetch, setShouldFetch] = useState(false);
	const {theme} = use(ThemeContext);

	return (
		<div
			className={cn(
				'p-4 rounded-lg flex flex-col items-center gap-4',
				theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black',
			)}>
			<h3 className='text-lg font-semibold'>Conditional Data Fetching</h3>
			<button
				onClick={() => setShouldFetch(!shouldFetch)}
				className={cn(
					'px-4 py-2 rounded-md',
					theme === 'dark'
						? 'bg-blue-600 hover:bg-blue-700'
						: 'bg-yellow-500 hover:bg-yellow-600',
				)}>
				{shouldFetch ? 'Disable' : 'Enable'} Data Fetching
			</button>
			<Suspense
				fallback={
					<div className='p-4 rounded-lg'>
						<p>Loading data...</p>
					</div>
				}>
				<DataDisplay shouldFetch={shouldFetch} />
			</Suspense>
		</div>
	);
};

export default ConditionalData;
