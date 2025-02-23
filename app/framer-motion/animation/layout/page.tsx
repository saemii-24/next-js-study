'use client';
import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Container from '@/components/Container';
import {cn} from 'utils/cn';
type Tab = {
	icon: string;
	label: string;
};

const allIngredients: Tab[] = [
	{icon: '🍅', label: '토마토토'},
	{icon: '🥬', label: '양상추'},
	{icon: '🧀', label: '치즈'},
];

const [tomato, lettuce, cheese] = allIngredients;
const tabs: Tab[] = [tomato, lettuce, cheese];

export default function Layout() {
	const [isOn, setIsOn] = useState(false);
	const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

	return (
		<Container>
			<Container.Title>Layout</Container.Title>
			<div className='space-y-3'>
				<h1 className='mt-4 font-medium '>두 개 레이아웃 전환 애니메이션</h1>
				<motion.div
					onClick={() => {
						setIsOn(!isOn);
					}}
					layout
					className={cn(
						`flex items-center cursor-pointer bg-purple-950 rounded-full w-24 p-2 `,
						{
							'justify-end': isOn,
						},
					)}>
					<motion.div layout className='rounded-full size-8 bg-purple-500' />
				</motion.div>
			</div>
			<div className='mt-5'>
				<h1 className=' font-medium '>layoutId를 이용한 애니메이션</h1>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					Framer Motion이 같은 layoutId를 가진 요소를 같은 요소로 인식하고
					애니메이션을 부드럽게 연결해준다!
				</p>
				<div className='w-full border  rounded-xl bg-white flex flex-col overflow-hidden'>
					<nav className='bg-gray-100  rounded-t-xl border-b border-gray-200'>
						<ul className='flex w-full list-none p-0 m-0 font-medium text-sm '>
							{tabs.map((item) => (
								<motion.li
									key={item.label}
									initial={false}
									animate={{
										backgroundColor: item === selectedTab ? '#eee' : '#eee0',
									}}
									className='relative flex-1 w-full items-center text-center px-4 py-2 rounded-t-md bg-white cursor-pointer text-gray-900 flex select-none'
									onClick={() => setSelectedTab(item)}>
									{`${item.icon}`}
									{item === selectedTab ? (
										<motion.div
											className='absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500'
											layoutId='underline'
										/>
									) : null}
								</motion.li>
							))}
						</ul>
					</nav>
					<main className='flex flex-1 justify-center items-center'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={selectedTab.label}
								initial={{y: 10, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								exit={{y: -10, opacity: 0}}
								transition={{duration: 0.2}}
								className='text-[128px]'>
								{selectedTab.icon}
							</motion.div>
						</AnimatePresence>
					</main>
				</div>
			</div>
		</Container>
	);
}
