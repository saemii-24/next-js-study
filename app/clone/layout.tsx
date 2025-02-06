'use client';

import Container from '@/components/Container';
import {createContext, useState} from 'react';

// Context 생성
export const LayoutContext = createContext('기본값 - 레이아웃');
export const LayoutIdContext = createContext({
	id: 1,
	increase: () => {},
	decrease: () => {},
});

export default function Layout({children}: {children: React.ReactNode}) {
	const [layoutId, setLayoutId] = useState(1);

	const increase = () => setLayoutId((prev) => prev + 1);
	const decrease = () => setLayoutId((prev) => Math.max(0, prev - 1)); // 0 이하로 내려가지 않도록 설정

	return (
		<>
			<Container>
				<Container.Title>CloneElement</Container.Title>
				<button
					onClick={increase}
					className='cursor-pointer p-2 bg-blue-500 text-white rounded'>
					(layout.tsx) 숫자가 증가해요!
				</button>
				<LayoutIdContext.Provider value={{id: layoutId, increase, decrease}}>
					{children}
				</LayoutIdContext.Provider>
			</Container>
		</>
	);
}
