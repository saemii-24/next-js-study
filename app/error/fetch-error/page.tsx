'use client';
import {useEffect, useState} from 'react';

export default function Example() {
	const [error, setError] = useState<Error | null>(null);

	const fetchError = async () => {
		try {
			const response = await fetch('/api/error', {
				method: 'POST',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `서버 오류: ${response.status}`);
			}
		} catch (err) {
			//instance of = 객체가 특정 클래스의 인스턴스인지 확인한다.
			//즉, err가 ERrror 객체인지 확인하는 과정이다.
			if (err instanceof Error) {
				setError(err);
			}
		}
	};

	useEffect(() => {
		if (error) throw error; // 렌더링 과정에서 에러 발생
	}, [error]);

	return (
		<button
			className='bg-pink-500 cursor-pointer hover:bg-pink-500/70 text-white p-2 rounded-md'
			onClick={fetchError}>
			fetch 에러 발생
		</button>
	);
}
