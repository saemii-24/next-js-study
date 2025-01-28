import React, {ReactNode} from 'react';

const Container = ({children}: {children: ReactNode}) => {
	return <div className='w-full p-6'>{children}</div>;
};

// 정적 속성으로 Title 추가
Container.Title = ({children}: {children: ReactNode}) => {
	return <h1 className='text-2xl font-semibold'>{children}</h1>;
};

export default Container;
