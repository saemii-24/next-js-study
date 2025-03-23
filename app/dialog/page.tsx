'use client';

import {useEffect, useRef, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function Dialog() {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
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
					<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
						<dialog
							ref={dialogRef}
							className='flex items-center justify-center'
							onClick={closeModal}></dialog>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
