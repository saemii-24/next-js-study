'use client';
import Link from 'next/link';

export default function PrefetchTest() {
	return (
		<main style={{paddingTop: 30}}>
			<h1>Next.js 프리페치 비교</h1>
			<p>
				👀 개발자도구에서 <b>네트워크 → JS</b> 탭을 열고 차이점을 확인한다.
			</p>
			<p>
				버튼 위로 스크롤하거나 호버하면 각 페이지의 번들이 언제 로드되는지
				확인할 수 있다.
			</p>

			<div className='flex gap-1 mt-5'>
				<Link href='/prefetch' prefetch={true}>
					<button>/prefetch로 이동 (prefetch: true)</button>
				</Link>

				<Link href='/non-prefetch' prefetch={false}>
					<button>/non-prefetch로 이동 (prefetch: false)</button>
				</Link>
			</div>
		</main>
	);
}
