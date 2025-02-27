import Container from '@/components/Container';

export default function tailwind3() {
	return (
		<Container>
			<Container.Title>tailwind 선택자</Container.Title>
			<div>
				짝수 <code className='code'>[&:nth-child(even)]</code> - 파랑
			</div>
			<div>
				홀수 <code className='code'>[&:nth-child(odd)]</code> - 빨강
			</div>
			<ul className='mt-2 *:w-full *:py-1 *:text-center space-y-2 *:rounded-md'>
				{[1, 2, 3, 4, 5, 6].map((item, index) => {
					return (
						<li
							key={index}
							className='[&:nth-child(even)]:bg-blue-100 [&:nth-child(odd)]:bg-red-100'>
							{item}
						</li>
					);
				})}
			</ul>
			<Container.Title className='mt-4'>tailwind 선택자</Container.Title>
			<div className='mb-2'>
				특정 태그 선택 <br />
				<code className='code'>[&_p]</code> - p 태그만 선택
				<br />
				<code className='code'>[&_div]</code> - div 태그만 선택
			</div>
			<div className='[&_p]:bg-yellow-100 [&_div]:bg-purple-100 [&_h1]:bg-green-100'>
				<p>
					<code className='code'>p</code> 태그
				</p>
				<ul>
					<li>
						<code className='code'>li</code> 태그
					</li>
					<li>
						<p>
							<code className='code'>p</code> 태그
						</p>
					</li>
				</ul>
				<div>
					<code className='code'>div</code> 태그
				</div>
				<h1>
					<code className='code'>h1</code> 태그
				</h1>
			</div>
			<Container.Title className='mt-4'>tailwind 선택자</Container.Title>
			<div className='mt-4'>
				<details
					className='cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg'
					open>
					<summary className='text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none'>
						클릭해서 열어보세요
					</summary>
					<div className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400'>
						<p>여기서 내용을 확인할 수 있습니다!</p>
					</div>
				</details>
			</div>
		</Container>
	);
}
