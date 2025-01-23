import {NextRequest, NextResponse, userAgent} from 'next/server';

export function middleware(request: NextRequest) {
	const {device} = userAgent(request);

	// 모바일 디바이스일 때만 리디렉션 처리
	if (device.type === 'mobile') {
		const currentPath = request.nextUrl.pathname;
		if (currentPath !== '/mobile-home') {
			return NextResponse.redirect(new URL('/mobile-home', request.url));
		}
	}

	// PC 디바이스일 경우 다음으로 진행한다.
	return NextResponse.next();
}

export const config = {
	matcher: '/', // 안쓰면 다른 경로까지 확인함
};
