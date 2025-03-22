import Container from '@/components/Container';
import KoreaForm from './_components/KoreaForm';
export default function Page() {
	return (
		<Container>
			<Container.Title>
				Next 15
				<br />
				Form Component
			</Container.Title>
			<h1 className='text-center text-2xl mt-10'>대한민국 행정구역 검색</h1>
			<KoreaForm />
		</Container>
	);
}
