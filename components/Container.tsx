import React, {ReactNode} from 'react';

const Container = ({children}: {children: ReactNode}) => {
	return <div className='w-full p-6'>{children}</div>;
};

Container.Title = ({children}: {children: ReactNode}) => {
	return <h1 className='text-2xl font-semibold'>{children}</h1>;
};

Container.SubTitle = ({children}: {children: ReactNode}) => {
	return <h2 className='text-xl font-semibold mt-5'>{children}</h2>;
};

export default Container;
