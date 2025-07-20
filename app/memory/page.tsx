'use client';
import React, {useState, useEffect} from 'react';

export default function MemoryPage() {
	const [showLeaky, setShowLeaky] = useState(false);
	const [showClean, setShowClean] = useState(false);

	return (
		<div className='p-8 max-w-4xl mx-auto'>
			<h1 className='text-2xl font-bold mb-8 text-center'>
				메모리 누수 비교하기
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* 메모리 누수 컴포넌트 */}
				<div className='border-2 border-red-500 rounded-lg p-6'>
					<h2 className='text-lg font-bold text-red-600 mb-4'>
						❌clean up함수 없음
					</h2>
					<button
						onClick={() => setShowLeaky(!showLeaky)}
						className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4'>
						{showLeaky ? 'Close' : 'Open'} 메모리 누수 타이머
					</button>
					{showLeaky && <LeakyTimer />}
				</div>

				{/* 정상 컴포넌트 */}
				<div className='border-2 border-green-500 rounded-lg p-6'>
					<h2 className='text-lg font-bold text-green-600 mb-4'>
						✅clean up함수 있음
					</h2>
					<button
						onClick={() => setShowClean(!showClean)}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4'>
						{showClean ? 'Close' : 'Open'} 정상 타이머
					</button>
					{showClean && <CleanTimer />}
				</div>
			</div>
		</div>
	);
}

// ❌ 메모리 누수가 발생하는 컴포넌트
function LeakyTimer() {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		console.log('🔴 메모리 누수 타이머가 마운트되었습니다');

		// 클로저에 포착될 큰 데이터 생성
		const largeData: any[] = new Array(10000).fill(0).map((_, i) => ({
			id: i,
			timestamp: Date.now(),
			data: `큰-데이터-${i}-${Math.random()}`,
		}));

		//set Interval의 Callback 함수가 외부의 largeData를 참조하여 클로저 생성
		//console.log에서 largeData.length를 참조하고 있으므로 GC가 메모리 해제 불가
		const timer = setInterval(() => {
			setCount((prev) => prev + 1);
			console.log(
				'🔴 메모리 누수 타이머 Count up:',
				count + 1,
				'큰 데이터와 함께:',
				largeData.length,
			);

			// 계속해서 데이터가 증가함
			largeData.push({
				id: largeData.length,
				newData: new Array(100).fill(`누수-${Date.now()}`),
			});
		}, 1000);

		// ❌clean up함수가 없음 - 메모리 누수 발생!
		// clean up이 된다면 unmount된 경우 GC가 실행되어 메모리를 해제하게 됨
	}, []);

	return (
		<div className='space-y-2'>
			<div className='text-lg font-mono'>카운트: {count}</div>
			<div className='text-xs text-red-600'>
				⚠️ 컴포넌트가 언마운트되어도 타이머와 큰 데이터가 계속 증가합니다!
			</div>
		</div>
	);
}

// ✅ 정상적으로 작동하는 컴포넌트 clean up함수 포함)
function CleanTimer() {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		console.log('✅ 정상 타이머가 마운트되었습니다');

		const timer = setInterval(() => {
			setCount((prev) => prev + 1);
			console.log('✅ 정상 타이머 Count up:', count + 1);
		}, 1000);

		// ✅ 올바른clean up함수
		return () => {
			console.log('✅ 정상 타이머 정리 - 타이머가 제거되었습니다');
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='space-y-2'>
			<div className='text-lg font-mono'>카운트: {count}</div>
			<div className='text-xs text-green-600'>
				✅ 언마운트 시 타이머가 올바르게 정지됩니다
			</div>
		</div>
	);
}
