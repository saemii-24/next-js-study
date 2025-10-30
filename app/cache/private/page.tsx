'use client';

import {Suspense} from 'react';
import {cookies} from 'next/headers';

import {cacheLife, cacheTag} from 'next/cache';
// 메인 페이지 컴포넌트
export default async function Page() {
	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>개인화된 도서 추천</h1>

			<Suspense fallback={<div>추천 도서를 불러오는 중...</div>}>
				<BookRecommendations />
			</Suspense>
		</main>
	);
}

async function BookRecommendations() {
	const books = await getPersonalizedBooks();

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{books.map((book) => (
				<BookCard key={book.id} book={book} />
			))}
		</div>
	);
}

async function getPersonalizedBooks() {
	'use cache: private';
	cacheTag('personalized-books');
	cacheLife({stale: 60}); // 60초 동안 캐시 유지

	// 쿠키에서 사용자 선호 장르 가져오기
	const preferredGenre =
		(await cookies()).get('preferred-genre')?.value || 'all';

	const mockBooks = [
		{id: 1, title: '자바스크립트 마스터하기', genre: 'programming'},
		{id: 2, title: '리액트 실전 가이드', genre: 'programming'},
		{id: 3, title: '미드나잇 라이브러리', genre: 'fiction'},
		{id: 4, title: '아침 명상의 기술', genre: 'self-help'},
		{id: 5, title: 'Next.js 완벽 가이드', genre: 'programming'},
	];

	return preferredGenre === 'all'
		? mockBooks
		: mockBooks.filter((book) => book.genre === preferredGenre);
}

function BookCard({book}: {book: any}) {
	return (
		<div className='border rounded-lg p-4 bg-white shadow-sm'>
			<h3 className='font-bold'>{book.title}</h3>
			<p className='text-sm text-gray-600'>{book.genre}</p>
		</div>
	);
}
