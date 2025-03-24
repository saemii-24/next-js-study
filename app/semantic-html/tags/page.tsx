import Container from '@/components/Container';

export default function Tags() {
	return (
		<Container>
			<Container.Title className=''>HTML Semantic Tags</Container.Title>
			<div className='space-y-3 mt-4'>
				<div>
					<h1>
						<code className='code'>&lt;abbr&gt;</code>
					</h1>
					<p>
						<abbr title='Cascading Style Sheets'>CSS</abbr>는 어떤 것의
						줄임말일까요?
					</p>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;time&gt;</code>
					</h1>
					<p>
						time 태그를 이용해 시간을
						<time dateTime='2025-03-21'> March 21 </time>
						이렇게 나타내면 SEO에도 도움이 됩니다.
					</p>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;address&gt;</code>
					</h1>
					<p>
						<p>이메일, 전화번호, URL, 주소등 연락처 정보를 나타낼 수 있어요.</p>
						<address className='text-gray-400'>
							<p>
								전화번호: <a href='tel:+010-1234-5678'>+82 (010) 1234-5678</a>
							</p>
						</address>
					</p>
				</div>
			</div>
		</Container>
	);
}
