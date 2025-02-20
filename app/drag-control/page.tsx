'use client';
import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function DragControl() {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div>
			<button
				onClick={() => {
					setIsVisible(!isVisible);
				}}
				className='cursor-pointer mt-2 p-2 w-[100px] bg-blue-500 hover:bg-blue-500/80 text-white rounded'>
				{isVisible ? '숨기기' : '보여주기'}
			</button>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						className='w-full bg-black/30 h-[calc(100dvh-200px)]'
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: 0.5}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
