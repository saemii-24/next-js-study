import Container from '@/components/Container';

export default function Groupin() {
	return (
		<Container>
			<Container.Title>group과 in</Container.Title>
			<div className='space-y-4 mt-3'>
				{/* Group Example */}
				<div className='group p-4 border border-gray-300 rounded-lg'>
					<h2 className='text-lg font-bold mb-2'>Group </h2>
					<div className='opacity-50 group-hover:opacity-100 transition-opacity'>
						박스에 hover 해보세요
					</div>
				</div>

				{/* In-* Example */}
				<div className='p-4 border border-gray-300 rounded-lg'>
					<h2 className='text-lg font-bold mb-2'>In-* </h2>
					<div className='opacity-50 in-hover:opacity-100 transition-opacity'>
						뷰포트에 hover 해보세요
					</div>
				</div>
			</div>

			<Container.SubTitle>group에 이름주기</Container.SubTitle>
			<ul role='list' className=' mt-3 space-y-2 **:cursor-pointer '>
				<li className='group/item p-4 border'>
					<span className='text-gray-900'>아이템 1</span>
					<button className='group-hover/item:text-blue-500'>수정</button>
				</li>

				<li className='group/item p-4 border'>
					<span className='text-gray-900'>아이템 2</span>
					<button className='group-hover/item:text-blue-500'>수정</button>
				</li>

				<li className='group/edit p-4 border'>
					<span className='text-gray-900'>아이템 3</span>
					<button className='group-hover/edit:text-red-500'>삭제</button>
				</li>
			</ul>
		</Container>
	);
}
