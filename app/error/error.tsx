'use client';

export default function ErroBoundary({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div>
			<h2>에러가 발생했습니다.</h2>

			<button
				className='h-10 px-10 rounded-lg bg-red-500 text-white cursor-pointer'
				onClick={() => reset()}>
				재시도
			</button>
		</div>
	);
}
