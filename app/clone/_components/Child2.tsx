'use client';
import React from 'react';

const Child2 = ({num}: {num: number}) => {
	return (
		<div>
			<div>자식 컴포넌트2에 내려주는 값:{num}</div>
		</div>
	);
};

export default Child2;
