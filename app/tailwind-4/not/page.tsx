import Container from '@/components/Container';

export default function Not() {
	return (
		<Container>
			<Container.Title>not</Container.Title>
			<div className='space-y-5'>
				<div className='not-hover:opacity-75 bg-blue-500 p-4 text-white cursor-pointer'>
					마우스를 올리지 않으면 투명도 75%
				</div>
				<label className='flex items-center space-x-2'>
					<input type='checkbox' id='apple' className='hidden peer' />
					<div className='peer-not-checked:bg-red-500 peer-checked:bg-green-500 text-white px-4 py-2 cursor-pointer'>
						체크하면 초록색, 해제하면 빨간색
					</div>
				</label>
				<div className='not-motion-reduce:animate-bounce p-4 bg-green-500 text-white'>
					모션 감소 설정이 아닐 때만 bounce 애니메이션 적용
				</div>
				<div className='not-supports-backdrop-blur:bg-gray-700 bg-white backdrop-blur-md p-4 text-white'>
					backdrop-blur을 지원하지 않으면 bg-gray-700 적용
				</div>
			</div>
		</Container>
	);
}
