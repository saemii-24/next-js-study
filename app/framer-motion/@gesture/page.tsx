'use client';
import {motion} from 'motion/react';
import {useRef, useState} from 'react';
export default function Usage() {
	const [hoverStart, setHoverStart] = useState<string>('호버 안하는 중...');
	const [scale, setScale] = useState<number>(1);
	const [tapMessage, setTapMessage] = useState<string>('탭을 시도해주세요!');
	const [pointInfo, setPointInfo] = useState<any>(null);
	const [fillColor, setFillColor] = useState('blue');

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
				<div>Focus 하면 애니메이션 (키보드 tab으로 foucs하기)</div>
				<motion.a
					href='#'
					whileFocus={{scale: 1.2}}
					transition={{type: 'spring', stiffness: 300, damping: 20}}
					tabIndex={1}
					className='text-blue-500 text-xl font-semibold'>
					포커스를 받으면 확대
				</motion.a>
				<div>클릭 이벤트가 부모 요소로 전달됨</div>
				<motion.div
					className='flex flex-col '
					whileTap={{background: '#999999'}}
					style={{
						width: 300,
						height: 300,
						backgroundColor: '#f2f2f2',
						color: 'black',
					}}>
					회색, 보라색 영역을 각각 클릭해보세요
					<button className='rounded-lg bg-purple-600 cursor-pointer size-20 mb-1 font-medium mt-4 text-sm text-white p-2 flex items-center justify-center text-center'>
						버튼 클릭
					</button>
				</motion.div>
				<div>클릭 이벤트 부모 요소로 전달되지 않도록 막음 (버블링 차단!)</div>
				<motion.div
					className='flex flex-col '
					whileTap={{background: '#999999'}}
					style={{
						width: 300,
						height: 300,
						backgroundColor: '#f2f2f2',
						color: 'black',
					}}>
					회색, 보라색 영역을 각각 클릭해보세요
					<button
						onPointerDownCapture={(e) => e.stopPropagation()} // 포인터 이벤트 전파를 막음
						className='rounded-lg bg-purple-600 cursor-pointer size-20 mb-1 font-medium mt-4 text-sm text-white p-2 flex items-center justify-center text-center'>
						버튼 클릭
					</button>
				</motion.div>
				<div>
					SVG에 가우시안 블러주기
					<div className='text-xs text-gray-500'>
						파란 원(svg)에 hover 해보세요!
					</div>
					<div className='text-xs text-gray-500'>
						SVG 필터 요소는 물리적인 존재가 아니기 때문에 이벤트를 받을 수 없어
						부모 요소에 핸들러를 추가하고 자식 요소의 속성을 변경해야 한다!
					</div>
				</div>

				<motion.svg
					width='300'
					height='300'
					viewBox='0 0 300 300'
					whileHover='hover'
					style={{
						width: 300,
						height: 300,
						backgroundColor: '#f2f2f2',
						color: 'black',
					}}>
					<filter id='blur'>
						<motion.feGaussianBlur
							stdDeviation={0}
							variants={{hover: {stdDeviation: 2}}}
						/>
					</filter>
				</motion.svg>

				<div>
					SVG 컬러 변경
					<div className='text-xs text-gray-500'>
						파란 원(svg)에 hover 해보세요!
					</div>
				</div>
				<motion.svg
					style={{
						width: 300,
						height: 300,
						backgroundColor: '#f2f2f2',
						color: 'black',
					}}
					viewBox='0 0 300 300'>
					<motion.circle
						cx='150'
						cy='150'
						r='50'
						fill={fillColor} // 상태에 따라 fill 색상 변경
						onHoverStart={() => {
							setFillColor('orange');
						}}
						onHoverEnd={() => {
							setFillColor('blue');
						}}
					/>
				</motion.svg>
			</div>
		</>
	);
}
