'use client';

import Container from '@/components/Container';
import {motion} from 'framer-motion';
import {useRef, useState} from 'react';

export default function ScrollAnimation() {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<Container>
			<Container.Title>스크롤 애니메이션</Container.Title>
			<button
				onClick={() => {
					window.location.reload();
				}}
				className='h-10 px-10 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-blue-500/70'>
				새로고침
			</button>
			<div className='mt-10 font-medium text-2xl'>whileInView</div>

			<p className='mt-3 text-md font-medium'>
				[whileInView] 요소가 뷰포트(화면)에 들어올 때 실행할 애니메이션을
				정의한다!
			</p>

			{/* 스크롤 가능한 컨테이너 */}
			<div className='overflow-auto w-full h-[30vh] bg-amber-50 relative'>
				<div className='text-center w-full flex items-center justify-center bg-blue-400 mt-10 text-white py-1 rounded-xl'>
					스크롤 해보세요...
				</div>
				<div className='h-[200vh] bg-amber-50 relative'>
					<motion.div
						className='absolute bottom-10 text-center w-full flex items-center justify-center bg-amber-300 py-1 rounded-xl'
						initial={{opacity: 0}} // 초기 상태
						whileInView={{opacity: 1}} // 뷰포트에 들어올 때
						transition={{duration: 0.5}}>
						앗 뷰포트에 들어왔다!!
					</motion.div>
				</div>
			</div>

			<p className='mt-10 text-md font-medium'>
				뷰포트 애니메이션을 최초 1회만 실행시킨다!
			</p>
			{/* 또 다른 스크롤 가능한 컨테이너 */}
			<div className='overflow-auto w-full h-[30vh] bg-amber-50 relative'>
				<div className='text-center w-full flex items-center justify-center bg-blue-400 mt-10 text-white py-1 rounded-xl'>
					스크롤 해보세요...
				</div>
				<div className='h-[200vh] bg-amber-50 relative'>
					<motion.div
						className='absolute bottom-10 text-center w-full flex items-center justify-center bg-amber-300 py-1 rounded-xl'
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						viewport={{once: true}} // 한 번만 실행
					>
						앗 뷰포트에 들어왔다!!
					</motion.div>
				</div>
			</div>

			<p className='mt-10 text-md font-medium'>
				특정 요소를 트리거로 삼아보자!
			</p>
			<div className='overflow-auto w-full h-[30vh] bg-amber-50 relative'>
				<div className='text-center w-full flex items-center justify-center bg-blue-400 mt-10 text-white py-1 rounded-xl'>
					스크롤 해보세요...
				</div>
				<div className='h-[200vh] bg-amber-50 relative'>
					<motion.div
						className='absolute bottom-10 text-center w-full flex items-center justify-center bg-amber-300 py-1 rounded-xl'
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						onViewportEnter={() => setIsVisible(true)} // 뷰포트에 들어올 때 상태 변경
						onViewportLeave={() => setIsVisible(false)} // 뷰포트에서 나갈 때 상태 변경
						transition={{duration: 0.5}}>
						앗 뷰포트에 들어왔다!!
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={isVisible ? {opacity: 1} : {opacity: 0}}
				viewport={{root: scrollRef}}
				className='w-full  mt-2 text-red-500 mb-5 flex items-center justify-center font-bold'>
				그럼 나타나야지 뿅
			</motion.div>
		</Container>
	);
}
