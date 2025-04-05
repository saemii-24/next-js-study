'use client';
import Container from '@/components/Container';
import Link from 'next/link';

export default function Page() {
	return (
		<Container>
			<Container.Title>REACT 19</Container.Title>
			<div className='**:rounded-lg mt-4 space-y-3 **:w-full **:h-12 **:flex **:items-center **:justify-center **:bg-blue-500 **:text-white **:hover:bg-blue-500/70 **:cursor-pointer'>
				<Link
					role='button'
					href='/react/use'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/react/use';
						}
					}}>
					use
				</Link>
				<Link
					role='button'
					href='/react/use-effect'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/react/use-effect';
						}
					}}>
					useEffect + useState
				</Link>
                <Link
					role='button'
					href='/react/use-effect-loading'
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							window.location.href = '/react/use-effect-loading  ';
						}
					}}>
					useEffect + useState + loading?
				</Link>
			</div>
		</Container>
	);
}
