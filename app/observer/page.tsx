'use client';

import {useEffect, useRef, useState} from 'react';

export default function Observer() {
	const boxRef = useRef<HTMLDivElement>(null);
	const [items, setItems] = useState<string[]>([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!boxRef.current) return;

		const observer = new MutationObserver((mutations) => {
			console.log('DOM 변화 감지!! 💝');
			mutations.forEach((m) => console.log(m));

			setCount((prev) => prev + 1);
		});

		observer.observe(boxRef.current, {
			childList: true,
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='p-6'>
				<h2 className='text-xl font-semibold mb-4'>MutationObserver 예제</h2>

				<p className='mb-2'>
					DOM 변화 감지 횟수: <span className='font-bold'>{count}</span>
				</p>

				<button
					onClick={() => setItems((prev) => [...prev, '새 아이템'])}
					className='mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
					아이템 추가
				</button>

				<div
					ref={boxRef}
					className='border border-gray-400 p-4 h-[300px] overflow-y-auto rounded-md bg-white'>
					{items.map((item, index) => (
						<div
							key={index}
							className='p-2 my-1 bg-gray-100 rounded-md text-gray-800'>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
