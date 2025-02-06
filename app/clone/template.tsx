'use client';
import {createContext, ReactElement} from 'react';

// Context 생성
export const TemplateContext = createContext('기본값 - 템플릿');

export default function Template({children}: {children: ReactElement}) {
	return (
		<TemplateContext.Provider value={'직접 내려준 값 - 템플릿'}>
			{children}
		</TemplateContext.Provider>
	);
}
