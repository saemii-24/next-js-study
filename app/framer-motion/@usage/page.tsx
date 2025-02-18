'use client';
import {motion} from 'motion/react';
import {useState} from 'react';
export default function Usage() {
	const [animationTrigger, setAnimationTrigger] = useState<boolean>(false);
	return (
		<>
			<button
				onClick={() => {
					window.location.reload();
				}}
				className='h-10 px-10 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-500/70'>
				새로고침
			</button>
			<div className='**:rounded-lg **:even:bg-pink-600 **:even:size-20 **:odd:mb-1 **:odd:font-medium **:odd:mt-4'>
				<div>렌더링 되면 바로 애니메이션 작동</div>
				<motion.div animate={{rotate: 360}} />
				<div>특정 초기값 지정해서 애니메이션 적용</div>
				<motion.div initial={{scale: 0}} animate={{scale: 1}} />
				<div>특정 초기값 + transition</div>
				<motion.div
					initial={{scale: 0}}
					animate={{
						scale: 1,
						transition: {duration: 1},
					}}
				/>
				<div>초기값으로 애니메이션 비활성화(false)</div>
				<motion.div initial={false} animate={{scale: 1}} />

				<div>초기 비활성화, 트리거 있을 때만 활성화</div>
				<motion.div
					onClick={() => setAnimationTrigger(!animationTrigger)} // 클릭 시 애니메이션 트리거
					initial={false} // 첫 렌더링에서는 애니메이션을 자동으로 적용하지 않음
					animate={{x: animationTrigger ? 100 : 0}} // 트리거가 활성화되면 애니메이션 실행
					transition={{duration: 0.5}} // 애니메이션 속도 설정
					className='cursor-pointer text-white p-2 flex items-center justify-center text-center text-sm'>
					클릭하면 시작!
				</motion.div>
			</div>
		</>
	);
}
