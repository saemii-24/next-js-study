'use client';
import {useState} from 'react';
import {cn} from 'utils/cn';

export default function TailwindFour() {
	// 상태 관리: 박스 크기 토글
	const [size, setSize] = useState<string>('lg');

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
				<div>
					<div className='flex gap-2'>
						<button
							onClick={() => {
								setSize('xs');
							}}
							className='px-3 py-1 bg-yellow-500 text-white cursor-pointer'>
							xs
						</button>
						<button
							onClick={() => {
								setSize('sm');
							}}
							className='px-3 py-1 bg-yellow-500 text-white cursor-pointer'>
							sm
						</button>
						<button
							onClick={() => {
								setSize('md');
							}}
							className='px-3 py-1 bg-yellow-500 text-white cursor-pointer'>
							md
						</button>
						<button
							onClick={() => {
								setSize('lg');
							}}
							className='px-3 py-1 bg-yellow-500 text-white cursor-pointer'>
							lg
						</button>
					</div>

					<div
						className={cn('@container bg-gray-200 ', {
							'w-[50px]': size === 'xs',
							'w-[100px]': size === 'sm',
							'w-[200px]': size === 'md',
							'w-[300px]': size === 'lg',
						})}>
						<div className='@sm:text-red-500 @md:text-green-500 @lg:text-blue-500 @xs:@max-md:text-2xl'>
							현재 {size} 사이즈에 맞는 CSS가 적용되었습니다.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
