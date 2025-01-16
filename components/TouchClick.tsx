'use client';
import React, {useState, useRef} from 'react';
import {cn} from 'utils/cn';

const TouchClick = () => {
	const [position, setPosition] = useState({x: 50, y: 50});
	const [isDragging, setIsDragging] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const buttonSize = 80; // 버튼 크기 (px)

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
		setPosition({x: 50, y: 50});
		setIsDragging(false);
	};

	// 드래그 시작
	const handleDragStart = (
		event:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
		setIsDragging(true);
		if ('touches' in event) {
			setTouchStart(true); // touch 이벤트 시작 시
		} else {
			setMouseDown(true); // mouse 이벤트 시작 시
		}
	};

	// 드래그 중
	const handleDragMove = (
		event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		if (!isDragging) return;

		// clientX와 clientY 추출
		let clientX: number, clientY: number;

		if ('touches' in event) {
			// TouchEvent인 경우
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
			setTouchMove(true); // 드래그 중 touch
		} else {
			// MouseEvent인 경우
			clientX = event.clientX;
			clientY = event.clientY;
			setMouseDown(true); // 드래그 중 mouse
		}

		const container = containerRef.current;
		if (container) {
			const rect = container.getBoundingClientRect();

			// 부모 컴포넌트 경계 내에서만 위치를 업데이트 (버튼 크기 고려)
			const x = Math.min(
				Math.max(clientX - rect.left, buttonSize / 2),
				rect.width - buttonSize / 2,
			);
			const y = Math.min(
				Math.max(clientY - rect.top, buttonSize / 2),
				rect.height - buttonSize / 2,
			);

			setPosition({x, y});
		}
	};

	// 드래그 종료
	const handleDragEnd = (event: React.MouseEvent | React.TouchEvent) => {
		setIsDragging(false);
		if ('touches' in event) {
			setTouchEnd(true); // touch 이벤트 종료 시
		} else {
			setMouseUp(true); // mouse 이벤트 종료 시
		}
	};

	return (
		<div className='mt-6'>
			{/* 부모 컴포넌트 */}
			<div
				ref={containerRef}
				className='relative h-60 w-full rounded border border-gray-300 bg-gray-100'
				onTouchStart={() => setTouchStart(true)}
				onTouchMove={(e) => {
					handleDragMove(e);
				}}
				onMouseMove={(e) => handleDragMove(e)}
				onMouseUp={handleDragEnd}
				onTouchEnd={(e) => handleDragEnd(e)}
				onMouseLeave={handleDragEnd}>
				{/* 드래그 가능한 버튼 */}
				<button
					style={{
						position: 'absolute',
						top: `${position.y}px`,
						left: `${position.x}px`,
						transform: 'translate(-50%, -50%)',
						width: `${buttonSize}px`,
						height: `${buttonSize}px`,
					}}
					onMouseDown={(e) => handleDragStart(e)}
					onTouchStart={(e) => handleDragStart(e)}
					className='rounded-md border border-gray-300 bg-white p-4 text-center transition hover:bg-blue-500'></button>
			</div>
			<ul className='mt-4'>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isTouchStart} />
					onTouchStart
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isTouchMove} />
					onTouchMove
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isTouchEnd} />
					onTouchEnd
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isTouchCancel} />
					onTouchCancel
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isClick} />
					onClick
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isMouseDown} />
					onMouseDown
				</li>
				<li className='flex items-center gap-3'>
					<Sign nowEvent={isMouseUp} />
					onMouseUp
				</li>
			</ul>
		</div>
	);
};

export default TouchClick;

const Sign = ({nowEvent}: {nowEvent: boolean}) => {
	return (
		<>
			<div
				className={cn('size-3 rounded-full bg-gray-300', {
					'bg-green-500': nowEvent === true,
					'bg-red-500': nowEvent === false,
				})}></div>
		</>
	);
};
