export default async function Page() {
	//서버 컴포넌트는 Node.js에서 실행되므로, Node는 /api/node 같은 상대 경로를 알 수 없다.
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const data = await fetch(`${baseUrl}/api/node?fruit=apple`).then((res) =>
		res.json(),
	);

	return <div>콘솔을 확인하세요!</div>;
}
