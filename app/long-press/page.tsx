'use client';
import {useState} from 'react';

const initialData = [
	{id: 1, data: '바다'},
	{id: 2, data: '밤'},
	{id: 3, data: '밤비'},
];

export default function LongPress() {
	const [data, setData] = useState(initialData);
	const [deleteModeId, setDeleteModeId] = useState<number | null>(null);
	let pressTimer: NodeJS.Timeout | null = null; //Node 에서 사용되는 setTimeout의 내부 클래스

	const touchStart = (id: number) => {
		pressTimer = setTimeout(() => {
			setDeleteModeId(id);
		}, 500);
	};

	const touchEnd = () => {
		if (pressTimer) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}
	};

	const deleteItem = (id: number) => {
		setData(data.filter((item) => item.id !== id));
		setDeleteModeId(null);
	};

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
			{data.map((item) => (
				<div
					key={item.id}
					data-testid={item.id}
					className='relative h-[120px] w-[90%] rounded-md bg-gray-100 p-3 transition hover:bg-gray-200'
					onTouchStart={() => touchStart(item.id)}
					onTouchEnd={touchEnd}>
					<div>no.{item.id}</div>
					<h2>{item.data}</h2>
					{deleteModeId === item.id && (
						<button
							className='absolute right-3 top-3 flex size-8 items-center justify-center rounded-md bg-red-500 text-white'
							onClick={() => deleteItem(item.id)}>
							X
						</button>
					)}
				</div>
			))}
		</div>
	);
}
