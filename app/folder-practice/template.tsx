'use client';

import {useEffect, useState} from 'react';

export default function Template({children}: {children: React.ReactNode}) {
	const [color, setColor] = useState('');

	useEffect(() => {
		const randomColor = getRandomColor();
		setColor(randomColor);
	}, []);

	function getRandomColor() {
		const colors = [
			'text-blue-500',
			'text-red-500',
			'text-green-500',
			'text-yellow-500',
			'text-purple-500',
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	return (
		<div>
			<div className={color}>템플릿이 들어갑니다!</div>
			{children}
		</div>
	);
}
