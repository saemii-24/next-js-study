'use client';

import Container from '@/components/Container';
import {createContext} from 'react';

// Context 생성
export const LayoutContext = createContext('기본값 - 레이아웃');

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Container>
				<Container.Title>CloneElement</Container.Title>
			</Container>

			{/* 위에서 정의한 '하이'를 덮어씀 */}
			<LayoutContext.Provider value={'직접 내려준 값 - 레이아웃'}>
				{children}
			</LayoutContext.Provider>
		</>
	);
}
