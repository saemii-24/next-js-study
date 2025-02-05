'use client';
import Container from '@/components/Container';
import {Children, cloneElement, ReactElement} from 'react';

export default function Template({children}: {children: ReactElement}) {
	return (
		<Container>
			<Container.Title>CloneElement</Container.Title>

			{Children.map(children, (child) => {
				// props로 someProp을 전달
				return cloneElement(child as ReactElement<{propTest?: string}>, {
					propTest: '추가된 값',
				});
			})}
		</Container>
	);
}
