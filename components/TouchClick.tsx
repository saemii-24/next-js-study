'use client';
import React, {useState} from 'react';

const TouchClick = () => {
	const [log, setLog] = useState<string[]>([]);

	// 이벤트 핸들러
	const touchStart = () => setLog((prev) => [...prev, 'touchStart: true']);
	const touchMove = () => setLog((prev) => [...prev, 'touchMove: true']);
	const touchEnd = () => setLog((prev) => [...prev, 'touchEnd: true']);
	const touchCancel = () => setLog((prev) => [...prev, 'touchCancel: true']);
	const click = () => setLog((prev) => [...prev, 'click: true']);
	const mouseDown = () => setLog((prev) => [...prev, 'mouseDown: true']);
	const mouseUp = () => setLog((prev) => [...prev, 'mouseUp: true']);

	// 로그 초기화
	const clearLog = () => setLog([]);

	return (
		<div>
			<button
				onTouchStart={touchStart}
				onTouchMove={touchMove}
				onTouchEnd={touchEnd}
				onTouchCancel={touchCancel}
				onClick={click}
				onMouseDown={mouseDown}
				onMouseUp={mouseUp}
				className='bg-red-50 p-2 m-2 border border-gray-300 rounded'>
				버튼을 눌러보세요
			</button>

			<button
				onClick={clearLog}
				className='bg-blue-50 p-2 m-2 border border-gray-300 rounded'>
				로그 초기화
			</button>

			<ul className='mt-4 list-disc pl-6'>
				{log.map((entry, index) => (
					<li key={index}>{entry}</li>
				))}
			</ul>
		</div>
	);
};

export default TouchClick;
