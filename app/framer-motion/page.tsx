'use client';
import Container from '@/components/Container';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<Container>
			<Container.Title>Framer-motion</Container.Title>
			<div className='w-full'>framer-motion 정리</div>
			<ul className='bg-gray-50 p-4 flex flex-col gap-4 rounded-lg border border-gray-300 mt-3 '>
				<li>
					<div className='font-medium'>animation</div>
					<ul className='ml-2 border-l border-gray-700 px-4 *:hover:underline *:hover:text-blue-500 *:hover:cursor-pointer'>
						<li>
							<Link href={`${pathname}/animation/overview`}>overview</Link>
						</li>
						<li>
							<Link href={`${pathname}/animation/gesture`}>gesture</Link>
						</li>
						<li>
							<Link href={`${pathname}/animation/scroll`}>scroll</Link>
						</li>
						<li>
							<Link href={`${pathname}/animation/scroll`}>scroll</Link>
						</li>
					</ul>
				</li>
				<li>
					<div className='font-medium'>hooks</div>
					<ul className='ml-2 border-l border-gray-700 px-4 *:hover:underline *:hover:text-blue-500 *:hover:cursor-pointer'>
						<li>
							<Link href={`${pathname}/hooks/drag-control`}>drag-control</Link>
						</li>
					</ul>
				</li>
			</ul>
		</Container>
	);
}
