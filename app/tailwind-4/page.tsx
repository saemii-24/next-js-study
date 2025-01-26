'use client';
import {useState} from 'react';
import {cn} from 'utils/cn';

export default function TailwindFour() {
	// 상태 관리: 박스 크기 토글
	const [isSmall, setIsSmall] = useState(false);

	return (
		<div className='h-dvh w-full p-6'>
			<div className='flex flex-col gap-10'>
				<button className='px-4 py-2 bg-red-400 ring'>버튼입니다</button>
				<button className='px-4 py-2 bg-blue-400 ring-1'>버튼입니다</button>
				<button className='px-4 py-2 bg-green-400 ring-3'>버튼입니다</button>
				<button className='px-4 py-2 bg-lime ring-3'>버튼입니다</button>
				<button className='px-4 py-2 text-lime ring-3'>버튼입니다</button>

				<input
					type='text'
					placeholder='이것이 placeholder'
					className='border text-red-600 '
				/>

				<div className='size-20 bg-lime animate-scale-up '></div>

				<div className='size-10 border bg-red-300 text-purple-600 '>히히</div>

				{/* 클릭 시 컨테이너 크기 변경*/}
				<div
					className={cn('@container bg-lime cursor-pointer ', {
						'w-[100px]': isSmall,
						'w-[200px]': !isSmall,
					})}
					onClick={() => {
						setIsSmall(!isSmall);
					}}>
					{/* 텍스트: 컨테이너 크기에 따라 글씨 색이 변경됨 */}
					<div
						className={`text-center @sm:text-xs  @sm:text-red-500 @md:text-blue-500 @md:text-2xl text-black`}>
						{isSmall
							? '컨테이너가 작아져, 글씨가 작아졌습니다.'
							: '컨테이너가 커져 글씨가 커졌습니다.'}
					</div>
				</div>
			</div>
		</div>
	);
}
