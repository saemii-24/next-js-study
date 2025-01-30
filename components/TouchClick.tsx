'use client';
import React, {useState, useRef} from 'react';
import {cn} from 'utils/cn';

const TouchClick = () => {
	const [position, setPosition] = useState({x: 50, y: 50});
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const buttonSize = 80;

	// 하나의 상태로 통합
	const [currentEvent, setCurrentEvent] = useState<string | null>(null);

	// 상태 및 로그 초기화
	const clearLog = () => {
		setCurrentEvent(null);
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
			setCurrentEvent('onTouchStart'); // touch 이벤트 시작 시
		} else {
			setCurrentEvent('onMouseDown'); // mouse 이벤트 시작 시
		}
	};

	// 드래그 중
	const handleDragMove = (
		event:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>,
	) => {
		if (!isDragging) return;

		let clientX: number, clientY: number;

		if ('touches' in event) {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
			setCurrentEvent('onTouchMove');
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}

		const container = containerRef.current;
		if (container) {
			const rect = container.getBoundingClientRect();
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
			setCurrentEvent('onTouchEnd');
		} else {
			setCurrentEvent('onMouseUp');
		}
	};

	return (
		<>
			<div className='flex items-start justify-between'>
				<h1 className='text-2xl font-semibold'>이벤트 비교</h1>
				<button
					onClick={clearLog}
<<<<<<< HEAD
					className='rounded bg-red-500 px-4 pb-1 pt-[3px] text-sm text-white hover:bg-red-700'>
=======
					className='rounded-sm bg-red-500 px-4 pb-1 pt-[3px] text-sm text-white hover:bg-red-700'>
>>>>>>> 6af2117e1689725fda2ef36884109843af283e35
					초기화
				</button>
			</div>
			<div className='mt-1 break-keep'>
				박스를 움직여보며 이벤트가 일어나는지 살펴보자
			</div>
			<div className='mt-6'>
				<div
					ref={containerRef}
<<<<<<< HEAD
					className='relative h-60 w-full rounded border border-gray-300 bg-gray-100'>
=======
					className='relative h-60 w-full rounded-sm border border-gray-300 bg-gray-100'>
>>>>>>> 6af2117e1689725fda2ef36884109843af283e35
					<button
						style={{
							position: 'absolute',
							top: `${position.y}px`,
							left: `${position.x}px`,
							transform: 'translate(-50%, -50%)',
							width: `${buttonSize}px`,
							height: `${buttonSize}px`,
						}}
						onTouchStart={handleDragStart}
						onTouchMove={handleDragMove}
						onMouseMove={handleDragMove}
						onMouseUp={handleDragEnd}
						onTouchEnd={handleDragEnd}
						onMouseLeave={handleDragEnd}
						onMouseDown={handleDragStart}
						className='rounded-md border border-gray-300 bg-white p-4 text-center transition hover:bg-blue-500'></button>
				</div>
				<ul className='mt-4'>
					{[
						{label: 'onTouchStart', description: '터치 시작'},
						{label: 'onTouchMove', description: '터치 이동'},
						{label: 'onTouchEnd', description: '터치 종료'},
						{label: 'onMouseDown', description: '마우스 다운'},
						{label: 'onMouseUp', description: '마우스 업'},
					].map(({label, description}) => (
						<li key={label} className='mb-2 flex flex-col'>
							<div className='flex items-center gap-3'>
								<Sign isActive={currentEvent === label} />
								{label}
							</div>
							<div className='text-sm text-gray-600'>{description}</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

const Sign = ({isActive}: {isActive: boolean}) => {
	return (
		<div
			className={cn('size-3 rounded-full bg-gray-300', {
				'bg-green-500': isActive,
				'bg-red-500': !isActive,
			})}></div>
	);
};

export default TouchClick;
