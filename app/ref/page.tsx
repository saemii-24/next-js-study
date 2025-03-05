'use client';
import {useRef, useEffect, useState, RefObject} from 'react';
import Container from '@/components/Container';

export default function Ref() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const childRef = useRef<HTMLDivElement | null>(null);
	const [count, setCount] = useState<number>(0);
	const countRef = useRef<number>(0);

	const incrementState = () => {
		setCount(count + 1); // useState로 카운트를 증가
	};

	const incrementRef = () => {
		countRef.current += 1;
		console.log('현재 ref의 값:', countRef.current);
	};

	const [childText, setChildText] = useState<string>(
		'클릭해서 자식 컴포넌트의 text를 가져와볼까요?',
	);

	// 컴포넌트가 마운트될 때 자동으로 input에 포커스를 주기
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<Container>
			<Container.Title>Ref 활용법</Container.Title>
			<button
				onClick={() => {
					window.location.reload();
				}}
				className='h-10 px-10 rounded-lg bg-blue-500  text-white cursor-pointer hover:bg-blue-500/70'>
				새로고침
			</button>

			<ul className='[&_h2]:font-medium [&_h2]:text-lg [&_h2]:mt-5'>
				<li className='[&_input]:bg-gray-100 [&_input]:h-7 [&_input]:w-full [&_input]:rounded-md'>
					<h2>1. DOM 요소 참조하기</h2>
					<p>
						컴포넌트가 마운트되면, ref로 지정한 input이 자동으로 포커스가
						맞춰집니다.
					</p>

					<p className='text-xs text-blue-500 mt-4 focus:border-blue-500'>
						1. ref를 사용해 DOM을 조작
					</p>
					<input ref={inputRef} />
					<p className='text-xs text-red-500 mt-4'>2. ref를 사용하지 않음</p>
					<input />
				</li>
				<li>
					<h2>2. 자식 컴포넌트의 DOM 접근하기</h2>
					<p className='text-gray-600 text-sm mb-3'>
						참고로, react 19부터 <code className='code'>forwardRef</code>가
						사용되지 않으면서 <code className='code'>ref</code> prop으로
						변경되었다.
					</p>
					<div
						onClick={() => {
							setChildText(childRef.current?.innerText ?? '');
						}}>
						<Child ref={childRef} />
					</div>
					<p>{childText}</p>
				</li>
				<li>
					<h2>3. ref와 state의 값 참조</h2>
					<p className='text-gray-600 text-sm mb-3'>
						<code className='code'>useState</code>는 값이 변경될때마다 리렌더링
						시키지만, <code className='code'>useRef</code>는 리렌더링 되지
						않는다. 따라서, <code className='code'>useRef</code>로 관리하고 있던
						값이 증가됨에도 불가하고 실제 보이는 화면에서는 증가된 값이 보이지
						않는다!
					</p>
					<div className='[&_button]:w-full [&_button]:py-2 [&_button]:bg-blue-500 [&_button]:rounded-md [&_button]:text-white [&_button]:hover:bg-blue-500/70 [&_button]:cursor-pointer'>
						<h1>useState 카운트: {count}</h1>
						<button onClick={incrementState}>state로 관리되는 값 증가</button>

						<h1>useRef 카운트: {countRef.current}</h1>
						<button onClick={incrementRef}>ref로 관리되는 값 증가</button>
					</div>
				</li>
			</ul>
		</Container>
	);
}

const Child = ({ref}: {ref: RefObject<HTMLDivElement | null>}) => {
	return (
		<div
			ref={ref}
			className='w-full h-12 bg-purple-600 text-white center-flex rounded-md cursor-pointer'>
			자식 컴포넌트 입니다!
		</div>
	);
};
