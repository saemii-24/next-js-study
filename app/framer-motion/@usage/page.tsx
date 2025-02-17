'use client';
import {motion} from 'motion/react';
export default function Usage() {
	return (
		<>
			<button
				onClick={() => {
					window.location.reload();
				}}
				className='h-10 px-10 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-500/70'>
				새로고침
			</button>
			<div className='**:rounded-lg **:even:bg-pink-600 **:even:size-20 **:odd:mb-1 **:odd:font-medium'>
				<div className='mt-3'>렌더링 되면 바로 애니메이션 작동</div>
				<motion.div animate={{rotate: 360}} />
			</div>
		</>
	);
}
