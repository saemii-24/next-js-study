'use client';
import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Container from '@/components/Container';
import {cn} from 'utils/cn';

type Tab = {
	id: string;
	icon: string;
	label: string;
};

const allIngredients: Tab[] = [
	{id: 'tomato', icon: '🍅', label: '토마토'},
	{id: 'lettuce', icon: '🥬', label: '양상추'},
	{id: 'cheese', icon: '🧀', label: '치즈'},
];

const [tomato, lettuce, cheese] = allIngredients;
const tabs: Tab[] = [tomato, lettuce, cheese];

export default function Layout() {
	const [isOn, setIsOn] = useState(false);
	const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	return (
		<Container>
			<Container.Title>Layout</Container.Title>
			<div className='space-y-3'>
				<h1 className='mt-4 font-medium'>두 개 레이아웃 전환 애니메이션</h1>
				<motion.div
					onClick={() => setIsOn(!isOn)}
					layout
					className={cn(
						'flex items-center cursor-pointer bg-purple-950 rounded-full w-24 p-2',
						{'justify-end': isOn},
					)}>
					<motion.div layout className='rounded-full size-8 bg-purple-500' />
				</motion.div>
			</div>
			<div className='mt-5'>
				<h1 className='font-medium'>layoutId를 이용한 애니메이션</h1>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					Framer Motion이 같은 layoutId를 가진 요소를 같은 요소로 인식하고
					애니메이션을 부드럽게 연결해준다!
				</p>
				<h2>예제 1번 </h2>
				<div className='w-full border rounded-xl bg-white flex flex-col overflow-hidden'>
					<nav className='bg-gray-100 rounded-t-xl border-b border-gray-200'>
						<ul className='flex w-full list-none p-0 m-0 font-medium text-sm'>
							{tabs.map((item) => (
								<motion.li
									key={item.id}
									animate={{
										backgroundColor: item === selectedTab ? '#eee' : '#eee0',
									}}
									className='relative flex-1 w-full items-center text-center px-4 py-2 rounded-t-md bg-white cursor-pointer text-gray-900 flex select-none'
									onClick={() => setSelectedTab(item)}>
									{`${item.icon}`}
									{item === selectedTab && (
										<motion.div
											className='absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500'
											layoutId='underline'
										/>
									)}
								</motion.li>
							))}
						</ul>
					</nav>
					<main className='flex flex-1 justify-center items-center'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={selectedTab.id}
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
			<div className='mt-4'>
				<h2>예제 2번</h2>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					같은 이모지의 작은 카드와 큰 카드의 layoutId를 동일하게 설정해
					부드럽게 커지는 듯한 애니메이션을 만들어주었다.
				</p>
				<div className='flex divide-x divide-gray-300 gap-2 mt-3'>
					{allIngredients.map((item, index) => (
						<motion.div
							key={index}
							layoutId={item.id}
							onClick={() => setSelectedId(item.id)}
							className='flex-1 flex items-center justify-center border bg-white border-gray-200 rounded-2xl aspect-square hover:bg-gray-50 cursor-pointer'>
							{item.icon}
						</motion.div>
					))}
				</div>
				<AnimatePresence>
					{selectedId && (
						<motion.div
							className='fixed inset-0 flex items-center justify-center bg-black/50'
							onClick={() => setSelectedId(null)}>
							<motion.div
								className='w-64 h-64 bg-white flex flex-col items-center justify-center rounded-lg text-[100px]'
								layoutId={selectedId}>
								<AnimatePresence>
									{selectedId && (
										<motion.div
											className='text-lg mt-4'
											initial={{opacity: 0}}
											animate={{opacity: 1}}
											exit={{opacity: 0}}
											transition={{delay: 0.2, duration: 0.3}}>
											{
												allIngredients.find((item) => item.id === selectedId)
													?.label
											}
										</motion.div>
									)}
								</AnimatePresence>

								{allIngredients.find((item) => item.id === selectedId)?.icon}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Container>
	);
}
