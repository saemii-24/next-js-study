import renderWait from '../lib';

export default async function Users() {
	await renderWait(3000);

	return (
		<div className='w-full h-20 bg-pink-50 items-center justify-center flex'>
			유저 정보가 표시됩니다.
		</div>
	);
}
