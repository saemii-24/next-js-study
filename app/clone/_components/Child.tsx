'use client';
import React from 'react';

const Child = ({someProp}: {someProp?: string}) => {
	console.log(someProp);
	return (
		<div>
			<div>자식 컴포넌트1에 내려주는 값: {someProp}</div>
		</div>
	);
};

export default Child;
