'use client';
import {signOut, useSession} from 'next-auth/react';

export default function MyPage() {
	const {data: session, status} = useSession();

	if (status === 'loading') {
		return <div>로딩 중...</div>;
	}

	if (!session) {
		return <div>로그인이 필요합니다.</div>;
	}

	return (
		<div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow'>
			<h1 className='text-2xl font-bold mb-6'>마이페이지</h1>
			<p className='mb-4 text-lg'>
				안녕하세요, <span className='font-semibold'>{session.user?.name}</span>
				님!
			</p>
			<button
				onClick={() => signOut({callbackUrl: '/auth/signin'})}
				className='w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'>
				로그아웃
			</button>
		</div>
	);
}
