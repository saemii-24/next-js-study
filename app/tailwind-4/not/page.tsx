import Container from '@/components/Container';

export default function Not() {
	return (
		<Container>
			<Container.Title>not</Container.Title>
			<div className='not-hover:opacity-75 bg-blue-500 p-4 text-white'>
				마우스를 올리지 않으면 투명도 75%
			</div>
			<div className='not-motion-reduce:animate-bounce p-4 bg-green-500 text-white'>
				모션 감소 설정이 아닐 때만 bounce 애니메이션 적용
			</div>

			<div className='not-supports-backdrop-blur:bg-gray-700 bg-white backdrop-blur-md p-4'>
				backdrop-blur을 지원하지 않으면 bg-gray-700 적용
			</div>
		</Container>
	);
}
