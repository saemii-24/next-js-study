'use client';
import React from 'react';

// 'someProp'이 옵션인 props 타입 정의
const Clone = ({someProp}: {someProp?: string}) => {
	console.log(someProp); // 이제 '추가된 값'이 출력될 것입니다
	return (
		<div>
			<div>자식 컴포넌트에 내려주는 값: {someProp}</div>
		</div>
	);
};

export default Clone;
