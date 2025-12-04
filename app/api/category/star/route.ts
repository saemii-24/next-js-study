import {NextResponse} from 'next/server';

export async function GET() {
	const star = {
		count: 1234,
		name: 'saemii-24',
	};
	return NextResponse.json(star);
}
