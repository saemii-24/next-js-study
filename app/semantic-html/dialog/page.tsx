'use client';

import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

export default function Dialog() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal(); //showModal은 이미 html의 내장 메서드이기 때문에 따로 function을 만들 필요가 없음
		} else {
			dialog.close();
		}
	}, [isOpen]);

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	return (
		<>
			<button
				className='mt-4 p-2 bg-blue-500 text-white rounded-md'
				onClick={openModal}>
				열기
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center'
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						onClick={closeModal}>
						<motion.dialog
							ref={dialogRef}
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-white rounded-lg'
							onClick={(e) => e.stopPropagation()}>
							<p>여기에 다이얼로그 내용이 들어갑니다.</p>
							<button
								onClick={closeModal}
								role='button'
								className='mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-500/70 cursor-pointer'>
								닫기
							</button>
						</motion.dialog>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
