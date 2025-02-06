'use client';

import {useContext} from 'react';
import {LayoutIdContext} from '../layout';

export default function CloneId() {
	const {id, decrease} = useContext(LayoutIdContext);

	return (
		<div className='p-4 border border-gray-300 rounded-lg'>
			<div className='text-lg font-semibold'>CloneId 컴포넌트</div>
			<div>현재 LayoutId: {id}</div>
			<button
				onClick={decrease}
				className='cursor-pointer mt-2 p-2 bg-red-500 text-white rounded'>
				(CloneId.tsx) 숫자가 감소해요!
			</button>
		</div>
	);
}
