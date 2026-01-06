import {NextResponse} from 'next/server';

export async function GET() {
	await new Promise((res) => setTimeout(res, 500));

	//실패 가정
	if (Math.random() < 0.2) {
		return NextResponse.json(
			{message: 'Failed to issue upload URL'},
			{status: 500},
		);
	}

	return NextResponse.json({
		uploadUrl: 'https://fake-storage.com/upload/123',
	});
}
