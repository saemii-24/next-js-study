'use client';

import {useActionState} from 'react';
import {createPost} from './_utils/action';
import Container from '@/components/Container';

const initialState = {
	message: '',
};

export default function Form() {
	const [state, formAction, pending] = useActionState(createPost, initialState);

	return (
		<Container>
			<Container.Title>에러 핸들링</Container.Title>
			<form action={formAction} className='mt-3 flex flex-col'>
				<label htmlFor='title' className='font-semibold text-lg mb-1'>
					제목
				</label>
				<input
					type='text'
					id='title'
					name='title'
					required
					className='border rounded-md'
				/>
				<label htmlFor='content' className='font-semibold text-lg mb-1'>
					본문
				</label>
				<textarea
					id='content'
					name='content'
					required
					rows={10}
					className='border rounded-md field-sizing-fixed resize-none'
				/>
				{state?.message && (
					<p aria-live='polite' className='text-xs text-red-500'>
						{state.message}
					</p>
				)}

				<button
					disabled={pending}
					type='submit'
					className='w-full text-center bg-blue-500 text-white h-8 rounded-md mt-3 cursor-pointer hover:bg-blue-500/70'>
					포스팅
				</button>
			</form>
		</Container>
	);
}
