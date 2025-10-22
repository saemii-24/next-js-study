'use server';
import {useTransition} from 'react';

// 서버 액션 / 캐시 선언
export async function getUsers() {
	'use cache';

	const res = await fetch('https://jsonplaceholder.typicode.com/users');

	const data = await res.json();
	console.log('Fetched from server');
	return data;
}

export default async function Page() {
	'use cache';

	const users = await getUsers();

	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Cached User List</h1>

			<ul className='space-y-2'>
				{users.map((u: any) => (
					<li key={u.id} className='border rounded-lg p-3 bg-gray-50'>
						{u.name} — {u.email}
					</li>
				))}
			</ul>

			<ClientComponent />
		</main>
	);
}

function ClientComponent() {
	'use client';

	const [isPending, startTransition] = useTransition();

	const handleRevalidate = async () => {
		startTransition(async () => {
			await fetch('/api/revalidate', {method: 'POST'});
			alert('서버 캐시가 재검증되었습니다!');
		});
	};

	return (
		<button
			onClick={handleRevalidate}
			disabled={isPending}
			className='mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
			{isPending ? 'Revalidating...' : 'Revalidate Cache'}
		</button>
	);
}
