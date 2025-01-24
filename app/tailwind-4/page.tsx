export default function TailwindFour() {
	return (
		<div className='h-dvh w-full p-6'>
			<div className='flex flex-col gap-10'>
				<button className='px-4 py-2 bg-red-400 ring'>버튼입니다</button>
				<button className='px-4 py-2 bg-blue-400 ring-1'>버튼입니다</button>
				<button className='px-4 py-2 bg-green-400 ring-3'>버튼입니다</button>

				<input
					type='text'
					placeholder='이것이 placeholder'
					className='border text-red-600 '
				/>

				<div className='size-10 border bg-red-300 text-purple-600 '>히히</div>
			</div>
		</div>
	);
}
