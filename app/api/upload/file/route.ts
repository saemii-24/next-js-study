import {NextResponse} from 'next/server';

export async function POST(request: Request) {
	await new Promise((res) => setTimeout(res, 700));

	const body = await request.json();
	const {uploadUrl, fileName} = body;

	if (!uploadUrl || !fileName) {
		return NextResponse.json({message: 'Invalid request'}, {status: 400});
	}

	// 실패 가정
	if (Math.random() < 1) {
		return NextResponse.json({message: 'Upload failed'}, {status: 500});
	}

	return NextResponse.json({
		fileUrl: `${uploadUrl}/${fileName}`,
	});
}
