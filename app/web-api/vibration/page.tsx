'use client';
import Container from '@/components/Container';
import React, {useRef, useState} from 'react';

export default function Vibration() {
	const [longPressActive, setLongPressActive] = useState<boolean>(false);
	const pressTimer = useRef<NodeJS.Timeout | null>(null); // 타이머 저장용

	// 롱 프레스 시작
	const handleTouchStart = () => {
		pressTimer.current = setTimeout(() => {
			if ('vibrate' in navigator) {
				navigator.vibrate(50); // 롱 프레스 시 진동 50ms
			}
			setLongPressActive(true); // 롱 프레스가 시작되었음을 상태로 관리
		}, 1000); // 1초 이상 눌렀을 때 롱 프레스 시작
	};

	// 롱 프레스 종료
	const handleTouchEnd = () => {
		if (pressTimer.current) {
			clearTimeout(pressTimer.current); // 타이머 취소
			pressTimer.current = null;
		}
		if (longPressActive) {
			setLongPressActive(false); // 롱 프레스 종료
		}
	};

	// 롱 프레스가 취소된 경우
	const handleTouchCancel = () => {
		if (pressTimer.current) {
			clearTimeout(pressTimer.current); // 타이머 취소
			pressTimer.current = null;
		}
		if (longPressActive) {
			setLongPressActive(false); // 롱 프레스 종료
		}
	};

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
			<p>모바일 기기가 진동으로 되어있는지 확인해주세요!</p>

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
				<button
					className='center-flex w-full py-2 rounded-md bg-blue-500 text-white cursor-pointer active:scale-95 focus-visible:scale-95'
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={handleTouchCancel}>
					<div className='text-lg '>꾹 눌러보세요!</div>
					{longPressActive && <p>롱 프레스가 활성화되었습니다!</p>}
				</button>
			</div>
		</Container>
	);
}
