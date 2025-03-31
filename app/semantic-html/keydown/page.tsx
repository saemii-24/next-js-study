'use client';

import Container from '@/components/Container';
import {useEffect, useRef, useState} from 'react';

import {AnimatePresence, motion} from 'framer-motion';

export default function Keydown() {
	return (
		<>
			<Container>
				<Container.Title>Keydown a11y</Container.Title>
				<div className='space-y-4 mt-6'>
					<AccessibleButton />
					<AccessibleDiv />
					<AccessibleHoverDiv />
					<FocusTrap />
				</div>
			</Container>
		</>
	);
}

const AccessibleButton = () => {
	const handleClick = () => {
		alert('button태그의 버튼을 클릭하셨습니다!');
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	return (
		<button
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className='w-full bg-blue-500 px-2 text-white center-flex text-center break-keep py-2 rounded-lg cursor-pointer'>
			마우스로 클릭하거나, 키보드로 상호작용 해보세요!
		</button>
	);
};
const AccessibleDiv = () => {
	const handleClick = () => {
		alert('div태그의 버튼을 클릭하셨습니다!');
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	return (
		<div
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='button'
			className='w-full bg-green-500 px-2 text-white center-flex text-center break-keep py-2 rounded-lg cursor-pointer'>
			마우스로 클릭하거나, 키보드로 상호작용 해보세요!
		</div>
	);
};

const AccessibleHoverDiv = () => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
			tabIndex={0}
			role='button'
			className={`w-full px-2 text-white text-center break-keep py-2 rounded-lg cursor-pointer ${
				isHovered ? 'bg-yellow-500' : 'bg-red-500'
			}`}>
			마우스로 호버하거나, 키보드로 상호작용 해보세요!
		</div>
	);
};

const FocusTrap = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	// focus 가능한 요소들
	const focusableElements = `button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])`;

	// 모달 열고 닫기 trigger
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	// Mouse로 모달 닫기
	const handleClick = () => {
		openModal();
	};

	// KeyDown으로 모달 열고 닫기
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openModal();
		} else if (event.key === 'Escape') {
			closeModal();
		}
	};

	// Focus Trap
	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

		const focusableContent =
			modalRef.current.querySelectorAll(focusableElements);
		if (!focusableContent.length) return;

		const firstElement = focusableContent[0] as HTMLElement;
		const lastElement = focusableContent[
			focusableContent.length - 1
		] as HTMLElement;

		const handleTabKey = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;

			if (event.shiftKey) {
				// Shift + Tab: 첫 번째 요소에서 마지막 요소로 이동
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				}
			} else {
				// Tab: 마지막 요소에서 첫 번째 요소로 이동
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		};

		document.addEventListener('keydown', handleTabKey);

		return () => {
			document.removeEventListener('keydown', handleTabKey);
		};
	}, [isOpen]);

	// 모달이 열리면 포커스 가능한 첫 번째 요소에 자동으로 포커스
	useEffect(() => {
		if (isOpen && modalRef.current) {
			const focusableContent =
				modalRef.current.querySelectorAll(focusableElements);
			const firstElement = focusableContent[0] as HTMLElement;

			firstElement?.focus();
		}
	}, [isOpen]);

	return (
		<>
			<div
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				role='button'
				className='w-full bg-purple-500 px-2 text-white center-flex text-center break-keep py-2 rounded-lg cursor-pointer'>
				마우스로 클릭하거나, 키보드로 상호작용 해서 모달을 열어보세요!
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						aria-hidden='true' // 단순히 시각적 디자인을 위한 것이므로 스크린 리더가 읽지 않도록 함
						className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center'
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						onClick={closeModal}>
						<motion.div
							role='dialog' // div이기 때문에 role로 역할 명시
							aria-modal='true'
							aria-labelledby='dialog_label'
							aria-describedby='dialog_desc'
							ref={modalRef}
							className='absolute top-1/2 left-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-white rounded-lg'
							onClick={(e) => e.stopPropagation()}>
							<h2
								id='dialog_label'
								className='text-lg text-center font-bold mb-1	'>
								a11y
							</h2>
							<p id='dialog_desc' className='break-keep text-center'>
								a11y 실습중! 완료 버튼을 누르면 모달이 close 됩니다.😊
							</p>
							<div className='flex gap-2'>
								<button
									role='button'
									className='mt-4 p-2 w-1/2 bg-white focus:ring-4 focus:ring-yellow-400 text-black border-gray-200 border rounded-md hover:bg-gray-100 cursor-pointer'>
									취소
								</button>
								<button
									onClick={closeModal}
									role='button'
									className='mt-4 p-2 w-1/2 bg-black focus:ring-4 focus:ring-yellow-400 text-white rounded-md hover:bg-black/60 cursor-pointer'>
									완료
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
