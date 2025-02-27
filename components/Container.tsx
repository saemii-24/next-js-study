import React, {ReactNode} from 'react';
import {cn} from 'utils/cn';

const Container = ({children}: {children: ReactNode}) => {
	return <div className='w-full p-6'>{children}</div>;
};

const Title = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
	);
};

const SubTitle = ({children}: {children: ReactNode}) => {
	return <h2 className='text-xl font-semibold mt-5'>{children}</h2>;
};

export const ContainerWithSubComponents = Object.assign(Container, {
	Title,
	SubTitle,
});

export default ContainerWithSubComponents;
