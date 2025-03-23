import Container from '@/components/Container';
export default async function Page({searchParams}: any) {
	const {district} = await searchParams;

	return (
		<Container>
			<Container.Title>
				Next 15
				<br />
				Form Component
			</Container.Title>
			<h1 className='text-center text-2xl mt-10'>대한민국 행정구역 검색</h1>
			<div className='text-center mt-4 underline text-blue-500'>
				{district}를 검색하셨습니다.
			</div>
		</Container>
	);
}
