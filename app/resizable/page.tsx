'use client';
import React, {HTMLAttributes, useState, useRef} from 'react';
import Container from '@/components/Container';
import {cn} from 'utils/cn';

const Resizable = () => {
	const [topHeight, setTopHeight] = useState(300);
	const isResizing = useRef(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const startY = useRef(0); // 마우스 클릭 시점의 Y 좌표
	const startHeight = useRef(0); // 마우스 클릭 시점의 Top 높이

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizing.current || !containerRef.current) return;

		// 마우스가 이동한 거리 계산
		const deltaY = e.clientY - startY.current;
		let newHeight = startHeight.current + deltaY;

		if (newHeight < 200) newHeight = 200;
		if (newHeight > 400) newHeight = 400;

		setTopHeight(newHeight);
	};

	const handleMouseUp = () => {
		isResizing.current = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		isResizing.current = true;

		// 현재 마우스 위치와 Top의 현재 높이 저장
		startY.current = e.clientY;
		startHeight.current = topHeight;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<Container>
			<Container.Title>Resizable 컴포넌트</Container.Title>
			<div
				ref={containerRef}
				className='h-[calc(100dvh-150px-12px)] mt-3 w-full bg-red-50'>
				<div style={{height: `${topHeight}px`}} className='relative w-full'>
					<Top />
					<div
						onMouseDown={handleMouseDown}
						className='w-full h-1 absolute bottom-0 left-0 right-0 bg-black cursor-ns-resize'
					/>
				</div>
				<Bottom style={{height: `calc(100% - ${topHeight}px)`}} />
			</div>
		</Container>
	);
};

export default Resizable;

interface DivProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Top = ({className, ...props}: DivProps) => {
	return (
		<div className={cn('w-full h-full bg-blue-400', className)} {...props}>
			top
		</div>
	);
};

const Bottom = ({className, ...props}: DivProps) => {
	return (
		<div className={cn('w-full bg-pink-400', className)} {...props}>
			Bottom
		</div>
	);
};
