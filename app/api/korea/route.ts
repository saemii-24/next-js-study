import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';

interface SeoulData {
	[date: string]: string[];
}

const filePath = path.join(process.cwd(), 'data', 'seoul.json');

// 📌 JSON 파일 읽기
async function getSeoul(): Promise<SeoulData> {
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents) as SeoulData;
}

// 📌GET: 전체 데이터 가져오기
export async function GET(request: Request) {
	const url = new URL(request.url); //url을 객체 형태로 변환한다.
	const seoul = url.searchParams.get('korea');

	// console.log(url);
	console.log('seoul:' + seoul);

	if (!seoul) {
		return NextResponse.json(
			{message: '자치구를 올바르게 입력하세요.'},
			{status: 400},
		);
	}

	try {
		const district = await getSeoul();
		return NextResponse.json(district[seoul] || []);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}
