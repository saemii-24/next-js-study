import Container from '@/components/Container';

export default function Popover() {
	return (
		<Container>
			<Container.Title>popover</Container.Title>

			<div className='mt-3'>
				<button
					popoverTarget='my-popover'
					className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer'>
					클릭해보세요
				</button>

				<div
					popover=''
					id='my-popover'
					className=' opacity-0 transition-discrete transition-all starting:open:opacity-0 open:opacity-100'>
					팝오버 내용이 나타납니다.
				</div>
			</div>
		</Container>
	);
}
