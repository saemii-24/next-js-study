'use client';
import React, {useRef, useState} from 'react';
import {cn} from 'utils/cn';

const TouchSlide = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [startX, setStartX] = useState<number | null>(null);
	const [currentTranslate, setCurrentTranslate] = useState<number>(0);
	const menuRef = useRef<HTMLDivElement>(null);

	// 터치 시작
	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setStartX(e.touches[0].clientX);
	};

	// 터치 이동
	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (startX === null) return;

		const currentX = e.touches[0].clientX;
		const difference = currentX - startX;

		if (isOpen && difference < 0) {
			setCurrentTranslate(difference);
		} else if (!isOpen && difference > 0) {
			setCurrentTranslate(difference);
		}
	};

	const handleTouchEnd = () => {
		const threshold = 100;
		if (isOpen) {
			if (Math.abs(currentTranslate) > threshold) {
				setIsOpen(false);
			} else {
				setCurrentTranslate(0);
			}
		} else {
			if (currentTranslate > threshold) {
				setIsOpen(true);
			} else {
				setCurrentTranslate(0);
			}
		}
		setStartX(null);
	};

	const clickMenuBtn = () => {
		setIsOpen(!isOpen);
		setCurrentTranslate(0);
	};

	return (
		<div className='relative'>
			{/* 버튼 */}
			<div className='flex w-full justify-end'>
				<button
					onClick={clickMenuBtn}
					className={`rounded px-4 pb-1 pt-[3px] text-sm text-white ${
						isOpen ? 'bg-blue-100' : 'bg-blue-500 hover:bg-blue-700'
					}`}>
					메뉴
				</button>
			</div>

			{/* 메뉴 */}
			<div
				ref={menuRef}
				className={cn(
					`absolute top-0 h-screen w-full bg-blue-100 duration-300`,
				)}
				style={{
					transform: `translateX(${isOpen ? currentTranslate : '-100%'})`,
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}>
				<button
					onClick={clickMenuBtn}
					className='flex size-9 items-center justify-center rounded-md bg-blue-200'>
					X
				</button>
				<div className='p-4'>사이드 메뉴</div>
			</div>
		</div>
	);
};

export default TouchSlide;
