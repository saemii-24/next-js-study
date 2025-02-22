'use client';
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import Container from '@/components/Container';
import {cn} from 'utils/cn';

export default function Layout() {
	const [isOn, setIsOn] = useState(false);

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
						`flex items-center cursor-pointer bg-purple-950 rounded-full w-24 p-2 h-24justify-start`,
						{
							'justify-end': isOn,
						},
					)}>
					<motion.div layout className='rounded-full size-8 bg-purple-500' />
				</motion.div>
			</div>
		</Container>
	);
}
