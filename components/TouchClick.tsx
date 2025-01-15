'use client';
import React, {useState} from 'react';

const TouchClick = () => {
	const [log, setLog] = useState<string[]>([]);

	// 이벤트 상태
	const [isTouchStart, setTouchStart] = useState(false);
	const [isTouchMove, setTouchMove] = useState(false);
	const [isTouchEnd, setTouchEnd] = useState(false);
	const [isTouchCancel, setTouchCancel] = useState(false);
	const [isClick, setClick] = useState(false);
	const [isMouseDown, setMouseDown] = useState(false);
	const [isMouseUp, setMouseUp] = useState(false);

	// 상태 및 로그 초기화
	const clearLog = () => {
		setLog([]);
		setTouchStart(false);
		setTouchMove(false);
		setTouchEnd(false);
		setTouchCancel(false);
		setClick(false);
		setMouseDown(false);
		setMouseUp(false);
	};

	// 이벤트 핸들러
	const handleEvent = (
		eventName: string,
		setState: React.Dispatch<React.SetStateAction<boolean>>,
	) => {
		setState(true);
		setLog((prev) => [...prev, eventName]);
	};

	return (
		<div className='p-4'>
			<div>
				<span className='font-bold'>Click, Mouse Events</span>
				<ul className='mt-2 list-disc pl-6'>
					<li>{isClick ? 'click' : ''}</li>
					<li>{isMouseDown ? 'mouseDown' : ''}</li>
					<li>{isMouseUp ? 'mouseUp' : ''}</li>
				</ul>
				<span className='font-bold'>Touch Events (Mobile)</span>
				<ul className='mt-2 list-disc pl-6'>
					<li>{isTouchStart ? 'touchStart' : ''}</li>
					<li>{isTouchMove ? 'touchMove' : ''}</li>
					<li>{isTouchEnd ? 'touchEnd' : ''}</li>
					<li>{isTouchCancel ? 'touchCancel' : ''}</li>
				</ul>
			</div>
			<button
				onTouchStart={() => handleEvent('touchStart', setTouchStart)}
				onTouchMove={() => handleEvent('touchMove', setTouchMove)}
				onTouchEnd={() => handleEvent('touchEnd', setTouchEnd)}
				onTouchCancel={() => handleEvent('touchCancel', setTouchCancel)}
				onClick={() => handleEvent('click', setClick)}
				onMouseDown={() => handleEvent('mouseDown', setMouseDown)}
				onMouseUp={() => handleEvent('mouseUp', setMouseUp)}
				className='bg-red-50 p-4 m-2 border border-gray-300 rounded w-full md:w-auto text-center'>
				이벤트 확인 버튼
			</button>

			<button
				onClick={clearLog}
				className='bg-blue-50 p-4 m-2 border border-gray-300 rounded w-full md:w-auto text-center'>
				로그 초기화
			</button>

			<h2 className='mt-4 font-bold'>이벤트 순서:</h2>
			<ul className='mt-2 list-disc pl-6'>
				{log.length === 0 ? (
					<li className='text-gray-500'>이벤트가 발생하지 않았습니다.</li>
				) : (
					log.map((entry, index) => <li key={index}>{entry}</li>)
				)}
			</ul>
		</div>
	);
};

export default TouchClick;
