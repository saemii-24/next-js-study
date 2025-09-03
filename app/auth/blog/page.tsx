'use client';
import {signOut} from 'next-auth/react';

export default function BlogPage() {
	return (
		<div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow'>
			<h1 className='text-2xl font-bold mb-6'>블로그 페이지입니다</h1>
			<button
				onClick={() => signOut({callbackUrl: '/auth/signin'})}
				className='w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'>
				로그아웃
			</button>
		</div>
	);
}
