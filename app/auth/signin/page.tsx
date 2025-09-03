'use client';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

export default function SignInPage() {
	const [entranceCode, setEntranceCode] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		const result = await signIn('credentials', {
			entranceCode,
			redirect: true,
			callbackUrl: '/', // 로그인 성공 시 이동 경로
		});
		if (result?.error) {
			setError('코드가 올바르지 않습니다.');
		}
	};

	return (
		<div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow'>
			<h1 className='text-2xl font-bold mb-6'>Entrance Code 로그인</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label
						htmlFor='entranceCode'
						className='block mb-2 text-sm font-medium text-gray-700'>
						Entrance Code
					</label>
					<input
						id='entranceCode'
						name='entranceCode'
						type='text'
						value={entranceCode}
						onChange={(e) => setEntranceCode(e.target.value)}
						required
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
					로그인
				</button>
				{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
			</form>
		</div>
	);
}
