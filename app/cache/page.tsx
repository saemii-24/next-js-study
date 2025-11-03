import {Suspense} from 'react';
import Categories from './_component/Categories';
import CategoriesSkeleton from './_component/Skeleton';

export default function Page() {
	return (
		<main className='space-y-10 p-8'>
			<h1 className='text-3xl font-bold text-white'>카테고리</h1>
			<Suspense fallback={<CategoriesSkeleton />}>
				{/* Categories는 데이터 fetch로 지연되므로 Skeleton을 먼저 렌더 */}
				<Categories />
			</Suspense>
		</main>
	);
}
