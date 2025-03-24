'use client';

export default function Popover() {
	return (
		<div className='relative flex flex-col items-center gap-4'>
			<button
				popoverTarget='my-popover'
				className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer'>
				팝오버!
			</button>
			<div
				popover='auto'
				id='my-popover'
				className='p-4 px-5 bg-white shadow-lg rounded-lg border border-gray-300 absolute top-[100px] left-1/2 -translate-x-1/2'>
				팝오버 등장!!
			</div>
		</div>
	);
}
