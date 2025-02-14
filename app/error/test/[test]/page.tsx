function getRandom(count: number) {
	return Math.floor(Math.random() * count);
}

export default function testPage() {
	const random = getRandom(2);

	if (random === 1) {
		throw new Error('에러 발생!');
	}

	return <div>에러를 테스트합니다.</div>;
}
