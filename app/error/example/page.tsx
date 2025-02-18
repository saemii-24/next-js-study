'use client';
import {useEffect, useState} from 'react';
import Container from '@/components/Container';

export default function ErrorExample() {
	const [error, setError] = useState<Error | null>(null);

	function throwError() {
		setError(new Error('에러 강제 발생!!'));
	}

	//next.js는 렌더링 과정에서 발생한 에러만 감지한다.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	return (
		<Container>
			<Container.Title>에러 핸들링</Container.Title>
			<button
				type='button'
				onClick={throwError}
				className='w-full text-center bg-red-500 text-white h-8 rounded-md mt-3 cursor-pointer hover:bg-red-500/70'>
				에러 발생
			</button>
		</Container>
	);
}
