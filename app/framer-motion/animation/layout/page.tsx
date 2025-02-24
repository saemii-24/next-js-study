'use client';
import React, {useState} from 'react';
import {AnimatePresence, LayoutGroup, motion} from 'framer-motion';
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
	const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5]);
	const [addComponent, setAddComponent] = useState<number[]>([1]);

	const reorderItems = () => {
		setItems((prevItems) => {
			const newItems = [...prevItems];
			const [movedItem] = newItems.splice(0, 1); // 첫 번째 요소를 제거
			newItems.push(movedItem); // 마지막에 추가
			return newItems;
		});
	};

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const addNewComponent = () => {
		setAddComponent((prev) => {
			const newItem = prev.length > 0 ? prev[0] + 1 : 1; // 가장 앞의 숫자 +1
			return [newItem, ...prev]; // 앞에 추가
		});
	};

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
			<div className='mt-4'>
				<h2>예제 3번</h2>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					React의 re-render로 인해 발생하는 레이아웃 변화를 애니메이션으로
					처리할 수 있다!
				</p>
				<button
					onClick={reorderItems}
					className='cursor-pointer bg-blue-500 rounded-lg text-white px-4 py-2 hover:bg-blue-500/70'>
					순서 변경
				</button>
				<div className='mt-4 flex flex-col space-y-2'>
					{items.map((item) => (
						<motion.div
							key={item}
							layout
							className='p-4 bg-yellow-500 rounded-lg '
							style={{backgroundColor: getRandomColor()}}>
							아이템 {item}
						</motion.div>
					))}
				</div>
			</div>
			<div className='mt-4'>
				<h2>예제 4번</h2>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					기존 컴포넌트가 추가 될 때도 부드럽게 애니메이션을 추가할 수 있다!
				</p>
				<button
					onClick={addNewComponent}
					className='cursor-pointer bg-blue-500 rounded-lg text-white px-4 py-2 hover:bg-blue-500/70'>
					컴포넌트 추가
				</button>
				<div className='mt-4 flex flex-col gap-2'>
					{addComponent.map((item) => (
						<motion.div
							key={item}
							layoutId={`item-${item}`}
							layout
							initial={{opacity: 0, scale: 0.8}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0.8}}
							className='p-4 bg-yellow-500 rounded-lg '>
							아이템 {item}
						</motion.div>
					))}
				</div>
			</div>
			<div className='mt-4'>
				<h2>예제 5번</h2>
				<p className='text-sm text-gray-600 mb-5 mt-1'>
					서로 다른 컴포넌트가 개별적으로 리렌더링될 경우,
					<code className='code'>motion.div</code>는 기본적으로 다른 컴포넌트의
					레이아웃 변화를 감지하지 못해 애니메이션이 올바르게 동작하지 않는
					경우가 있다.
				</p>
				<h3 className='text-sm mb-2'>❌ 개별적 렌더링, 그룹화 되지 않음</h3>
				<div className='flex flex-col items-center gap-2'>
					<Accordion />
					<Accordion />
					<Accordion />
				</div>
			</div>
			<div className='mt-4'>
				<h3 className='text-sm mb-2'>
					✅ <code className='code'>&lsaquo;LayoutGroup&rsaquo;</code>를 이용해
					그룹화
				</h3>
				<LayoutGroup>
					<div className='flex flex-col items-center gap-2'>
						<Accordion />
						<Accordion />
						<Accordion />
					</div>
				</LayoutGroup>
			</div>
		</Container>
	);
}

function Accordion() {
	const [isOpen, setOpen] = useState(false);

	return (
		<motion.div
			layout
			onClick={() => setOpen(!isOpen)}
			className='p-4 bg-yellow-500 w-full rounded-lg cursor-pointer '
			style={{height: isOpen ? '150px' : '50px'}}>
			<motion.span
				key={isOpen ? 'open' : 'closed'} //key가 변경될때마다 컴포넌트가 새로 마운트 되면서 initial=> animate 애니메이션이 재실행
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: 0.2, delay: 0.3}}>
				{isOpen ? '클릭해서 닫기' : '클릭해서 펼치기'}
			</motion.span>
		</motion.div>
	);
}
