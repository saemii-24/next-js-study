'use client';
import {motion} from 'motion/react';
import {useRef, useState} from 'react';
export default function Usage() {
	const [hoverStart, setHoverStart] = useState<string>('호버 안하는 중...');
	const [scale, setScale] = useState<number>(1);
	const [tapMessage, setTapMessage] = useState<string>('탭을 시도해주세요!');
	const [pointInfo, setPointInfo] = useState<any>(null);

	const [dragMessage, setDragMessage] =
		useState<string>('상자를 드래그해보세요!');
	const parentRef = useRef(null);
	const parentRef2 = useRef(null);
	const parentRef3 = useRef(null);

	return (
		<>
			<div className='*:rounded-lg *:even:bg-purple-600 *:cursor-pointer *:even:size-20 *:odd:mb-1 *:odd:font-medium *:odd:mt-4 *:even:text-sm *:even:text-white *:even:p-2 *:even:flex *:even:items-center *:even:justify-center *:even:text-center'>
				<div>[whileHover] hover 하는 동안 작동</div>
				<motion.div whileHover={{scale: 1.2}} className='cursor-pointer'>
					호버!
				</motion.div>
				<div>[onHoverStart, onHoverEnd] hover 하는/안하는 동안 작동</div>
				<motion.div
					animate={{scale}}
					onHoverStart={() => {
						setHoverStart('호버 하는 중!!!');
						setScale(1.2);
					}}
					onHoverEnd={() => {
						setHoverStart('호버 안하는 중...');
						setScale(1);
					}}
					className='cursor-pointer'>
					{hoverStart}
				</motion.div>
				<div>[whileTab] tab(element를 클릭하는)동안 작동</div>
				<motion.div whileTap={{scale: 0.8}} className='cursor-pointer'>
					클릭!
				</motion.div>
				<div>
					[onTapStart, onTapCancel, onTap]
					<ul className='text-gray-600 text-xs space-y-1 my-2'>
						<li className=''>
							<span className='text-purple-700 font-semibold'>onTapStart:</span>
							요소를 누르기 시작할 때
						</li>
						<li>
							<span className='text-purple-700 font-semibold'>
								onTapCancel:
							</span>{' '}
							요소를 누른 상태에서 커서를 요소 밖에 두고 마우스를 뗄 떼
						</li>
						<li>
							<span className='text-purple-700 font-semibold'>onTap:</span> 요소
							안에서 요소를 눌렀다 마우스를 뗄 떼
						</li>
					</ul>
				</div>
				<motion.div
					whileTap={{scale: 0.9, rotate: 3}}
					onTapStart={() => setTapMessage('탭 시작!')}
					onTapCancel={() => setTapMessage('탭이 취소되었습니다!')}
					onTap={() => setTapMessage('탭 완료!')}
					className='p-4 bg-blue-500 text-white rounded'>
					{tapMessage}
				</motion.div>
				<div>[onPen] 요소안에서 마우스를 누른채 움직여보세요</div>
				<motion.div
					className='select-none'
					onPan={(e, pointInfo) => {
						setPointInfo(pointInfo);
					}}
					onPanEnd={() => {
						setPointInfo(null);
					}}
					style={{width: 200, height: 200}}>
					{pointInfo ? (
						<div className='text-xs text-start'>
							<p>Movement X: {Math.floor(pointInfo.offset.x)}</p>
							<p>Movement Y: {Math.floor(pointInfo.offset.y)}</p>
							<p>Velocity X: {Math.floor(pointInfo.velocity.x)}</p>
							<p>Velocity Y: {Math.floor(pointInfo.velocity.y)}</p>
						</div>
					) : (
						<p>Pan을 시작하세요!</p>
					)}
				</motion.div>
				<div>[whileDrag] 드래그 이벤트</div>
				<div
					style={{width: 300, height: 300, backgroundColor: '#f2f2f2'}}
					ref={parentRef}>
					<motion.div
						drag
						dragConstraints={parentRef}
						dragElastic={0} // 탄성 조절
						whileDrag={{scale: 1.2}}
						onDrag={() => {
							setDragMessage('드래그 중!');
						}}
						onDragEnd={() => {
							setDragMessage('상자를 드래그해보세요!');
						}}
						className='rounded-lg bg-purple-600 cursor-pointer size-20 mb-1 font-medium mt-4 text-sm text-white p-2 flex items-center justify-center even:text-center'>
						{dragMessage}
					</motion.div>
				</div>
				<div>수평/수직 드래그만 허용</div>
				<div
					style={{width: 300, height: 300, backgroundColor: '#f2f2f2'}}
					ref={parentRef2}>
					<motion.div
						drag
						dragDirectionLock // 드래그 방향 잠금
						dragConstraints={parentRef2}
						// onDirectionLock={() => {}}
						whileDrag={{scale: 1.2}}
						className='rounded-lg bg-purple-600 cursor-pointer size-20 mb-1 font-medium mt-4 text-sm text-white p-2 flex items-center justify-center text-center'>
						현재 위치의 수평/수직만!
					</motion.div>
				</div>
				<div>수평 드래그만 허용</div>
				<div
					style={{width: 300, height: 300, backgroundColor: '#f2f2f2'}}
					ref={parentRef3}>
					<motion.div
						drag='x' // 수평 드래그만 가능
						dragConstraints={parentRef3}
						whileDrag={{scale: 1.2}}
						className='rounded-lg bg-purple-600 cursor-pointer size-20 mb-1 font-medium mt-4 text-sm text-white p-2 flex items-center justify-center text-center'>
						수평 드래그만!
					</motion.div>
				</div>
			</div>
		</>
	);
}
