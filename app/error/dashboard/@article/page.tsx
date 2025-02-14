import renderWait from '../lib';

export default async function Article() {
	await renderWait(4000);
	return (
		<div className='w-full h-20 bg-gray-50 items-center justify-center flex'>
			기사 정보가 표시됩니다.
		</div>
	);
}
