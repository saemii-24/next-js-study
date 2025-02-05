'use client';
import React from 'react';

const Child = ({propTest}: {propTest?: string}) => {
	return (
		<div>
			<div>자식 컴포넌트1에서 받은 값: {propTest}</div>
		</div>
	);
};

export default Child;
