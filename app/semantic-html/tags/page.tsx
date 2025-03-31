import Container from '@/components/Container';
import ChartComponent from 'app/chart/page';

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
						<code className='code'>&lt;aside&gt;</code>
					</h1>
					<aside>
						✨콜아웃
						<p>main 콘텐츠와 연관된 콜아웃 내용이 들어갑니다.</p>
					</aside>
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
				<div>
					<h1 className='flex gap-2'>
						<code className='code'>&lt;figure&gt;</code>
						<code className='code'>&lt;figcaption&gt;</code>
					</h1>
					<figure>
						<ChartComponent />
						<figcaption>가짜 데이터로 만든 chart.js 바 차트</figcaption>
					</figure>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;pre&gt;</code>
					</h1>
					<pre>(╯°□°）╯︵ ┻━┻</pre>
				</div>
				<div>
					<h1 className='flex gap-2'>
						<code className='code'>&lt;datalist&gt;</code>
						<code className='code'>&lt;fieldset&gt;</code>
						<code className='code'>&lt;legend&gt;</code>
					</h1>
					<div></div>
				</div>
				<div>
					<h1>
						<code className='code'>&lt;wbr&gt;</code>
					</h1>
					<h3 className=' font-medium mb-2'>1. 아무 처리도 하지 않은 경우</h3>
					<div className='border w-full border-gray-300 rounded-md p-2  overflow-auto whitespace-nowrap text-xs'>
						https://www.example.com/averyverylongurlwithoutanybreakpointsoitwontwrapproperly
					</div>

					<h3 className=' font-medium mt-4 mb-2'>
						2. Tailwind <code className='code'>break-words</code> 적용
					</h3>
					<div className='border border-gray-300 rounded-md p-2   break-words text-xs'>
						https://www.example.com/averyverylongurlwithoutanybreakpointsoitwontwrapproperly
					</div>

					<h3 className=' font-medium mt-4 mb-2'>3. br 태그 사용</h3>
					<div className='border w-full border-gray-300 rounded-md p-2  text-xs'>
						https://www.example.com/
						<br />
						averyverylongurlwithoutanybreakpointsoitwontwrapproperly
					</div>

					<h3 className=' font-medium mt-4 mb-2'>4. wbr 태그 사용</h3>
					<div className='border w-full border-gray-300 rounded-md p-2  text-xs'>
						https://www.example.com/
						<wbr />
						avery
						<wbr />
						very
						<wbr />
						long
						<wbr />
						url
						<wbr />
						without
						<wbr />
						any
						<wbr />
						breakpoints
						<wbr />
						so
						<wbr />
						it
						<wbr />
						wont
						<wbr />
						wrap
						<wbr />
						properly
					</div>
				</div>
				<div>
					<h1>영화 검색 사이트</h1>
					<search title='영화 검색'>
						<form action='/search/'>
							<label htmlFor='movie'>영화 검색</label>
							<input type='search' id='movie' name='q' />
							<button type='submit'>검색</button>
						</form>
					</search>
					<h2>렌트 가능한 차량 목록</h2>
					<search title='차량 검색'>
						<h3>필터 결과</h3>
						<input type='search' placeholder='차량 검색' />
					</search>
				</div>
			</div>
		</Container>
	);
}
