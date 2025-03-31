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
