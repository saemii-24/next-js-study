// Server Action 함수
async function createFruitFile(formData: FormData) {
	'use server';

	const fruit = formData.get('fruit') as string;

	if (!fruit || !fruit.trim()) {
		throw new Error('과일 이름을 입력해주세요!');
	}

	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
		const response = await fetch(
			`${baseUrl}/api/node?fruit=${encodeURIComponent(fruit)}`,
		);
		const data = await response.json();

		console.log('서버에서 API 응답:', data);

		if (!response.ok) {
			throw new Error(data.error || '파일 생성 실패');
		}

		// 성공 시 결과 페이지로 리다이렉트 (옵션)
		// redirect(`/result?fruit=${encodeURIComponent(fruit)}`);
	} catch (error) {
		console.error('Server Action 에러:', error);
		throw error;
	}
}

export default function Page() {
	return (
		<div className=' max-w-lg mt-10 mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>과일 txt 파일을 생성합니다.</h1>

			<form action={createFruitFile} className='space-y-4'>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='fruit' className='text-sm font-medium text-gray-700'>
						과일 이름
					</label>
					<input
						id='fruit'
						name='fruit'
						type='text'
						placeholder='과일 이름을 입력하세요'
						required
						className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
					/>
				</div>

				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
					파일 생성
				</button>
			</form>

			<div className='mt-5 text-sm text-gray-600 space-y-1'>
				<p>서버 콘솔을 확인해보세요!</p>
				<p>폼 제출 후 페이지가 새로고침됩니다.</p>
			</div>
		</div>
	);
}
