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
					<div>
						<p>이메일, 전화번호, URL, 주소등 연락처 정보를 나타낼 수 있어요.</p>
						<address className='text-gray-400'>
							<p>
								전화번호: <a href='tel:+010-1234-5678'>+82 (010) 1234-5678</a>
							</p>
						</address>
					</div>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;hgroup&gt;</code>
					</h1>
					<hgroup>
						<h1 className='text-2xl'>제목 h1태그</h1>
						<p>부제목 p태그</p>
					</hgroup>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;dl&gt;</code>
						<p>설명 목록(Definition List)</p>
					</h1>
					<h1>
						<code className='code'>&lt;dt&gt;</code>
						<p>설명 용어(Definition Term)</p>
					</h1>
					<h1>
						<code className='code'>&lt;dd&gt;</code>
						<p>설명 (Definition Description)</p>
					</h1>
					<dl>
						<dt>배송 문의</dt>
						<dd>주문 후 평균 2~3일 이내에 배송됩니다.</dd>

						<dt>교환 문의</dt>
						<dd>상품 수령 후 7일 이내에 교환이 가능합니다.</dd>

						<dt>반품 문의</dt>
						<dd>반품 신청은 배송 완료 후 7일 이내에 가능합니다.</dd>
					</dl>
				</div>
			</div>
		</Container>
	);
}
