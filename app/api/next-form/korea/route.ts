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
	const district = url.searchParams.get('district');

	console.log('district:' + district);

	if (!district) {
		return NextResponse.json(
			{message: '자치구를 올바르게 입력하세요.'},
			{status: 400},
		);
	}
	const districts = await getSeoul();
	console.log(districts);

	try {
		const districts = await getSeoul();
		const checkDistrict = districts['자치구'].filter((item) => {
			return item === district;
		});

		if (checkDistrict.length > 0) {
			return NextResponse.json(
				{message: `${checkDistrict}는 서울의 자치구입니다.`},
				{status: 200},
			);
		} else {
			return NextResponse.json(
				{message: `${checkDistrict}는 서울의 자치구가 아닙니다.`},
				{status: 200},
			);
		}
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}
