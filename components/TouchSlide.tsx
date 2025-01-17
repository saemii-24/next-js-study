'use client';
import React, {useState} from 'react';

const TouchSlide = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [startX, setStartX] = useState<number | null>(null);
	const [currentTranslate, setCurrentTranslate] = useState<number>(0);

	// 터치 시작
	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setStartX(e.touches[0].clientX);
		console.log('터치 시작!');
	};

	// 터치 이동
	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (!startX) return;

		const currentX = e.touches[0].clientX;
		const difference = currentX - startX;

		// 이동하는 거리만큼 메뉴 위치를 업데이트
		if (difference >= 0) {
			setCurrentTranslate(difference);
		}
		console.log('터치 이동!');
	};

	// 터치 종료
	const handleTouchEnd = () => {
		if (currentTranslate > 100) {
			// 닫기 조건: 이동 거리가 100px 이상
			setIsOpen(false);
		}
		// 초기화
		setStartX(null);
		setCurrentTranslate(0);
		console.log('터치 종료!');
		//일정 거리 이동하면 닫히게 한다.
		//터치가 종료되었을 때 일정거리에 도달하지 않으면 원래대로 돌려놓는다.
	};

	return (
		<div className='relative'>
			{/* 버튼 */}
			<div className='flex w-full justify-end'>
				<button
					onClick={() => setIsOpen((prev) => !prev)}
					className={`rounded px-4 pb-1 pt-[3px] text-sm text-white ${
						isOpen ? 'bg-blue-100' : 'bg-blue-500 hover:bg-blue-700'
					}`}>
					메뉴
				</button>
			</div>

			{/* 메뉴 */}
			<div
				className={`absolute left-0 top-0 h-screen w-4/5 bg-blue-100 transition-transform duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
				style={{
					transform: isOpen
						? `translateX(${Math.min(currentTranslate, 0)}px)`
						: 'translateX(-100%)',
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}>
				<div className='p-4'>사이드 메뉴</div>
			</div>
		</div>
	);
};

export default TouchSlide;
