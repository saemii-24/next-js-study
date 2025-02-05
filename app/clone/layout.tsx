'use client';
import Container from '@/components/Container';
import {Children, cloneElement, isValidElement, ReactElement} from 'react';

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<Container>
			<Container.Title>CloneElement</Container.Title>

			{Children.map(children, (child) => {
				// props로 someProp을 전달
				if (isValidElement(child)) {
					return cloneElement(child as ReactElement<{propTest?: string}>, {
						propTest: '추가된 값',
					});
				}
				return child;
			})}
		</Container>
	);
}
