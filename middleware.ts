import {NextRequest, NextResponse, userAgent} from 'next/server';

export function middleware(request: NextRequest) {
	const {device} = userAgent(request);

	if (device.type === 'mobile') {
		const currentPath = request.nextUrl.pathname;
		if (currentPath !== '/mobile-home') {
			return NextResponse.redirect(new URL('/mobile-home', request.url));
		}
	}
}
export const config = {
	matcher: '/', // 안쓰면 다른 경로까지 확인함
};
