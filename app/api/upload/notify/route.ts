import {NextResponse} from 'next/server';

export async function POST(request: Request) {
	await new Promise((res) => setTimeout(res, 400));

	const body = await request.json();
	const {fileUrl} = body;

	if (!fileUrl) {
		return NextResponse.json({message: 'fileUrl missing'}, {status: 400});
	}

	// 실패 가정
	if (Math.random() < 0.2) {
		return NextResponse.json({message: 'Notification failed'}, {status: 500});
	}

	return NextResponse.json({
		success: true,
	});
}
