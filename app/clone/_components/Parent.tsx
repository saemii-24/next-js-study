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
				// child가 ReactElement인지 확인하고, 타입을 명시적으로 지정
				if (isValidElement(child)) {
					// props로 someProp을 전달
					return cloneElement(child as ReactElement<{someProp?: string}>, {
						someProp: '추가된 값',
					});
				}
				return child; // child가 ReactElement가 아니면 그대로 반환
			})}
		</div>
	);
};

export default Parent;
