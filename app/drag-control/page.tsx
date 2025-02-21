'use client';
import React, {useRef, useEffect, useState} from 'react';
import {motion, useDragControls} from 'framer-motion';
import Container from '@/components/Container';

const DragControlExample: React.FC = () => {
	const dragControls1 = useDragControls();
	const dragControls2 = useDragControls();
	const dragControls3 = useDragControls();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [containerWidth, setContainerWidth] = useState<number>(0);

	const startDrag1 = (event: React.PointerEvent<HTMLDivElement>) => {
		dragControls1.start(event);
	};

	const startDrag2 = (event: React.PointerEvent<HTMLDivElement>) => {
		dragControls2.start(event);
	};

	const startDrag3 = (event: React.PointerEvent<HTMLDivElement>) => {
		dragControls3.start(event, {snapToCursor: true});
	};

	const leftConstraint = 0;
	const rightConstraint = 100;
	const pixelConstraints = {
		left: (leftConstraint / 100) * containerWidth,
		right: (rightConstraint / 100) * containerWidth - 48,
	};

	// 부모 크기 측정

	useEffect(() => {
		if (containerRef.current) {
			setContainerWidth(containerRef.current.clientWidth);
		}
	}, [containerRef]);

	return (
		<Container>
			<Container.Title>Drag Control 알아보기</Container.Title>
			<h1 className='mt-4 font-medium'>아래의 회색 트랙에서 드래그 해보세요</h1>
			<div ref={containerRef} className='w-full'>
				<motion.div
					drag='x'
					dragControls={dragControls1}
					dragConstraints={pixelConstraints}
					className='rounded-full w-10 h-10 bg-blue-500 cursor-pointer'
				/>
				<div
					onPointerDown={startDrag1}
					className='mt-2 w-full h-5 hover:bg-gray-500 rounded-full bg-gray-300 cursor-pointer'></div>
			</div>
			<h1 className='mt-4 font-medium'>Touch Action None</h1>
			<p className='text-sm mb-4 text-gray-600'>
				터치 스크린에서 사용자가 화면 터치 시 스크롤, 확대, 축소 기능이 발생할
				수 있는데, 해당 기본 동작을 방지함
			</p>
			<h1 className='mt-4 font-medium'>DragListener={'boolean'}</h1>
			<p className='text-sm mb-4 text-gray-600'>
				드래그 동작을 막는다. 다만{' '}
				<code className='code'>drag=&apos;x&apos;</code>와 같은 drag는 작성해야
				아래 트랙에서 해당 요소를 드래그 할 수 있다.
			</p>
			<div className='w-full h-24'>
				<motion.div
					drag='x'
					dragControls={dragControls2}
					dragConstraints={pixelConstraints}
					dragListener={false} // motion.div 직접 드래그 방지
					className='rounded-full w-10 h-10 bg-red-500'
				/>
				<div
					onPointerDown={startDrag2}
					style={{touchAction: 'none'}}
					className='mt-2 w-full h-5 hover:bg-gray-500 rounded-full bg-gray-300 cursor-pointer'></div>
			</div>

			<h1 className=' font-medium'>DragListener={'boolean'}</h1>
			<p className='text-sm mb-4 text-gray-600'>
				사용자가 드래그를 시작하는 순간에 해당 요소를 그 위치로 snap 시킨다.
			</p>
			<div className='code'>
				<code>
					dragControls.start(event, {'{'}snapToCursor: true{'}'})
				</code>
			</div>
			<motion.div
				drag='x'
				dragConstraints={pixelConstraints}
				dragControls={dragControls3}
				className='rounded-full w-10 h-10 bg-blue-500 mt-4'
			/>
			<div
				onPointerDown={startDrag3}
				style={{touchAction: 'none'}}
				className='mt-2 w-full h-5 hover:bg-gray-500 rounded-full bg-gray-300 cursor-pointer'></div>
		</Container>
	);
};

export default DragControlExample;
