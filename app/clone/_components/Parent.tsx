'use client';
import React, {
	ReactNode,
	isValidElement,
	cloneElement,
	Children,
	ReactElement,
} from 'react';

type ParentProps = {
	children: ReactNode;
};

const Parent = ({children}: ParentProps) => {
	return (
		<div>
			<div>레이아웃에 추가된 제목</div>
			{Children.map(children, (child) => {
				// props로 someProp을 전달
				return cloneElement(child as ReactElement<{propTest?: string}>, {
					propTest: '추가된 값',
				});
			})}
		</div>
	);
};

export default Parent;
