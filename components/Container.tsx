import React, {ReactNode} from 'react';

const Container = ({children}: {children: ReactNode}) => {
	return <div className='w-full p-6'>{children}</div>;
};

const Title = ({children}: {children: ReactNode}) => {
	return <h1 className='text-2xl font-semibold'>{children}</h1>;
};

const SubTitle = ({children}: {children: ReactNode}) => {
	return <h2 className='text-xl font-semibold mt-5'>{children}</h2>;
};

export const ContainerWithSubComponents = Object.assign(Container, {
	Title,
	SubTitle,
});

export default ContainerWithSubComponents;
