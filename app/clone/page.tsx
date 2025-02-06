'use client';

import {useContext} from 'react';
import {TemplateContext} from './template';
import {LayoutContext} from './layout';
import Container from '@/components/Container';
import {useRouter} from 'next/navigation';

export default function Clone() {
	const templateContext = useContext(TemplateContext);
	const layoutContext = useContext(LayoutContext);
	const router = useRouter();

	return (
		<Container>
			<div className='font-bold'>template.tsx에서 받은 값</div>
			<div>{templateContext}</div>

			<div className='font-bold'>layout.tsx에서 받은 값</div>
			<div>{layoutContext}</div>

			<div className='mt-3 text-xl font-semibold'>이동하기</div>
			{new Array(9).fill(0).map((_, index) => (
				<div key={index} className='p-4 border border-gray-300 rounded-lg'>
					<div className='flex justify-between items-center'>
						<div className='flex-1'>{index + 1}</div>
						<div className='flex-shrink-0'>
							<button
								onClick={() => {
									router.push(`/clone/${index + 1}`);
								}}
								className='hover:bg-gray-50 cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 text-gray-700 rounded-md hover:text-gray-800'>
								이동
							</button>
						</div>
					</div>
				</div>
			))}
		</Container>
	);
}
