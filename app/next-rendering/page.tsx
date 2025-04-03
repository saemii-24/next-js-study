'use client';
import Container from '@/components/Container';
import Link from 'next/link';

export default function Page() {
	return (
		<Container>
			<Container.Title>NEXT 렌더링 방식</Container.Title>
			<div className='**:rounded-lg mt-4 space-y-3 **:w-full **:h-12 **:flex **:items-center **:justify-center **:bg-blue-500 **:text-white **:hover:bg-blue-500/70 **:cursor-pointer'>
				<Link
					role='button'
					href='/next-rendering/csr'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/next-rendering/csr';
						}
					}}>
					CSR
				</Link>
				<Link
					role='button'
					href='/next-rendering/isr'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/next-rendering/isr';
						}
					}}>
					ISR
				</Link>
				<Link
					role='button'
					href='/next-rendering/ssg'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/next-rendering/ssg';
						}
					}}>
					SSG
				</Link>
				<Link
					role='button'
					href='/next-rendering/ssr'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/next-rendering/ssr';
						}
					}}>
					SSR
				</Link>
			</div>
		</Container>
	);
}
