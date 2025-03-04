'use client';
import Container from '@/components/Container';
import React from 'react';

export default function Vibration() {
	// 진동 패턴 함수
	const triggerVibration = (pattern: number | number[]) => {
		if ('vibrate' in navigator) {
			navigator.vibrate(pattern);
		} else {
			console.log('진동을 지원하지 않는 장치입니다.');
		}
	};

	return (
		<Container>
			<Container.Title>Vibration</Container.Title>
			<p className='mb-4'>진동은 모바일 기기에서만 작동합니다!</p>
			<div className='flex flex-col gap-4 *:px-4 *:py-2 *:rounded-md *:cursor-pointer *:transition *:text-white'>
				<button
					className='bg-blue-500 hover:bg-blue-500/60 n'
					onClick={() => triggerVibration(100)}>
					진동 1 (100ms)
				</button>
				<button
					className='bg-purple-500 hover:bg-purple-500/60'
					onClick={() => triggerVibration([200, 100, 200])}>
					진동 2 (200ms - 100ms - 200ms)
				</button>
				<button
					className='bg-pink-500 hover:bg-pink-500/60'
					onClick={() => triggerVibration([500, 200, 500, 200, 500])}>
					진동 3 (500ms - 200ms - 500ms - 200ms - 500ms)
				</button>
			</div>
		</Container>
	);
}
