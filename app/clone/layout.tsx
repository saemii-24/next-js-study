'use client';
import React, {ReactElement} from 'react';

type LayoutProps = {
	children: ReactElement<any>;
};

const Layout = ({children}: LayoutProps) => {
	return (
		<div>
			<div>레이아웃에 추가된 제목</div>
			{React.cloneElement(children, {someProp: '추가된 값'})}
		</div>
	);
};

export default Layout;
