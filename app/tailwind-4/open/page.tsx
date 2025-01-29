import Container from '@/components/Container';

export default function Open() {
	return (
		<Container>
			<Container.Title>Open</Container.Title>
			<div className='mt-3'>
				<details className='border border-gray-300 p-4 rounded-lg open:bg-gray-100 open:border-gray-400'>
					<summary className='cursor-pointer font-semibold'>
						tailwind 4.0에서 추가된 open
					</summary>
					<p className='mt-2 text-gray-700'>
						open variant를 사용해 <code>&lt;details&gt;</code> 또는
						<code>&lt;dialog&gt;</code> 요소가 open 상태일 때 스타일을 조건부로
						추가한다.
					</p>
				</details>
			</div>
		</Container>
	);
}
