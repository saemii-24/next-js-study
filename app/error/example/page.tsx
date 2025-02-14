'use client';
import {useEffect, useState} from 'react';

export default function Example() {
	const [error, setError] = useState<Error | null>(null);

	const makeError = () => {
		setError(new Error('미상의 에러'));
	};

	//next.js는 렌더링 과정에서 발생한 에러만 감지한다.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	return (
		<button
			className='h-10 px-10 rounded-lg bg-blue-500 text-white cursor-pointer'
			onClick={makeError}>
			에러 발생 트리거
		</button>
	);
}
