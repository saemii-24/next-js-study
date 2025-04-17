import {NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import path from 'path';

interface SeoulData {
	자치구: string[]; // 자치구 이름들을 배열로 받음
}

const filePath = path.join(process.cwd(), 'data', 'seoul-eng.json'); // 파일 경로 변경

// 📌 JSON 파일 읽기
async function getSeoul(): Promise<SeoulData> {
	const fileContents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(fileContents) as SeoulData;
}

/**
 * @swagger
 * /api/korea-eng:
 *   get:
 *     summary: 서울 자치구 검색
 *     description: 서울 자치구를 검색하고, 상황에 따라 적절한 응답값을 return 합니다.
 *     parameters:
 *       - in: query
 *         name: korea-eng
 *         required: true
 *         description: 사용자가 검색한 서울 자치구 이름
 *         schema:
 *           type: string
 *           example: "Gangdong"
 *     responses:
 *       200:
 *         description: 자치구가 검색되는 경우 return
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: 사용자가 자치구를 잘못된 형식으로 입력한 경우 return
 *       404:
 *         description: 자치구를 찾지 못한 경우 return
 *       500:
 *         description: 서버 에러가 발생한 경우 return
 */

// /api/korea-eng으로 현재 swagger로 작성하고 있는 api 경로를 맞게 설정해야 함에 주의한다.

export async function GET(request: Request) {
	const url = new URL(request.url);
	const district = url.searchParams.get('korea-eng'); // `korea` query parameter로 자치구 이름 받기

	if (!district) {
		return NextResponse.json(
			{message: '자치구를 올바르게 입력하세요.'},
			{status: 400},
		);
	}

	try {
		const seoulData = await getSeoul(); // JSON 파일에서 데이터 가져오기
		const districtData = seoulData.자치구.filter((name) =>
			name.toLowerCase().includes(district.toLowerCase()),
		); // 대소문자 구분 없이 검색

		if (districtData.length === 0) {
			return NextResponse.json(
				{message: '해당 자치구를 찾을 수 없습니다.'},
				{status: 404},
			);
		}

		return NextResponse.json(
			{
				message: '자치구를 찾았습니다.',
				districtData: districtData,
			},
			{status: 200},
		);
	} catch (error) {
		return NextResponse.json(
			{message: '서버에서 오류가 발생했습니다.'},
			{status: 500},
		);
	}
}
