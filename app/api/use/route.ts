import {NextResponse} from 'next/server';

// Promise 상태를 실험하기 위한 데이터
const data = [
	{id: 1, name: '신짱구', age: 10, address: '서울시 강남구'},
	{id: 2, name: '신짱아', age: 7, address: '서울시 강남구'},
	{id: 3, name: '김철수', age: 20, address: '서울시 서초구'},
	{id: 4, name: '이훈이', age: 16, address: '서울시 마포구'},
];

export async function GET() {
	// 1초 지연
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return NextResponse.json(data);
}
