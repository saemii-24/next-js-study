'use client'; // 에러 바운더리는 반드시 Client Component여야 한다.

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) {
	return (
		// global-error는 반드시 html과 body 태그를 포함해야 한다.
		<html>
			<body>
				<div className='w-screen h-screen flex items-center justify-center'>
					<h2>에러가 발생했습니다!!</h2>
					<button
						className='bg-cyan-800 text-white px-10 py-2 cursor-pointer hover:bg-cyan-800/70'
						onClick={
							// 세그먼트를 다시 렌더링하여 복구를 시도한다.
							() => reset()
						}>
						다시 시도하기
					</button>
				</div>
			</body>
		</html>
	);
}
