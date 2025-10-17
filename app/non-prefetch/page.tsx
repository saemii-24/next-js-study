function NonPrefetchPage() {
	return (
		<main>
			<h2>/non-prefetch 페이지</h2>
			<p>🚫 이 페이지는 않으며, JS 파일은 링크를 클릭한 후에만 로드된다.</p>
			<p>
				개발자도구 → 네트워크 → "게시자" 열에서 타이밍을 비교한다. (prefetch vs
				click).
			</p>
		</main>
	);
}
