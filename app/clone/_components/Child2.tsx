'use client';
import React from 'react';

const Child2 = ({num}: {num: number}) => {
	return (
		<div>
			<div>자식 컴포넌트2에서 받은 값: {num}</div>
		</div>
	);
};

export default Child2;
