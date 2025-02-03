'use client';
import React from 'react';

const Clone = ({someProp}: {someProp?: string}) => {
	console.log(someProp);
	return (
		<div>
			<div>자식 컴포넌트에 내려주는 값: {someProp}</div>
		</div>
	);
};

export default Clone;
