'use client';
import React, {
	ReactNode,
	isValidElement,
	cloneElement,
	Children,
	ReactElement,
} from 'react';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({children}: LayoutProps) => {
	return (
		<div>
			<div>레이아웃에 추가된 제목</div>
			{Children.map(children, (child) => {
				if (isValidElement<{someProp?: string}>(child)) {
					return cloneElement(child as ReactElement<{someProp?: string}>, {
						someProp: '추가된 값',
					});
				}
				return child;
			})}
		</div>
	);
};

export default Layout;
