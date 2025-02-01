'use client';

import Container from '@/components/Container';
import {useActionState} from 'react';

async function addNumber(
	previousState: number,
	formData: FormData,
): Promise<number> {
	const newValue = Number(formData.get('number'));
	return previousState + newValue;
}

export default function Form() {
	const [state, formAction, isPending] = useActionState<number, FormData>(
		addNumber,
		0,
	);

	return (
		<Container>
			<Container.Title>Form</Container.Title>
			<form action={formAction} className='mt-3'>
				<h2 className='text-xl mb-2'>현재 값: {state}</h2>
				<input
					type='number'
					name='number'
					required
					placeholder='숫자를 입력하세요'
					className='bg-gray-100 h-12 rounded-lg px-2 ring'
				/>
				<button
					type='submit'
					disabled={isPending}
					className='h-12 px-3 bg-blue-500 rounded-lg text-white'>
					{isPending ? '계산 중...' : '더하기'}
				</button>
			</form>
		</Container>
	);
}
