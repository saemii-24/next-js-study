import Container from '@/components/Container';

export default function tailwind3() {
	return (
		<Container>
			<Container.Title>tailwind 선택자</Container.Title>
			<ul className='mt-2 *:w-full *:py-1 *:text-center space-y-2 *:rounded-md'>
				{[1, 2, 3, 4, 5, 6].map((item, index) => {
					return (
						<li
							key={index}
							className='[&:nth-child(even)]:bg-blue-100 [&:nth-child(odd)]:bg-red-100'>
							{item}
						</li>
					);
				})}
			</ul>
		</Container>
	);
}
