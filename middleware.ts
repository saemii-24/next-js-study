// 기존 모바일 리디렉션 미들웨어 (비활성화)
/*
import {NextRequest, NextResponse, userAgent} from 'next/server';
export function middleware(request: NextRequest) {
	const {device} = userAgent(request);
	if (device.type === 'mobile') {
		const currentPath = request.nextUrl.pathname;
		if (currentPath !== '/mobile-home') {
			return NextResponse.redirect(new URL('/mobile-home', request.url));
		}
	}
	return NextResponse.next();
}
export const config = {
	matcher: '/', // 안쓰면 다른 경로까지 확인함
};
*/

// NextAuth 인증 미들웨어
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const {pathname} = req.nextUrl;
	const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

	// 인증되지 않은 사용자는 /auth/signin만 접근 가능
	if (!token) {
		if (pathname.startsWith('/auth/signin')) {
			return NextResponse.next();
		}
		const signinUrl = req.nextUrl.clone();
		signinUrl.pathname = '/auth/signin';
		return NextResponse.redirect(signinUrl);
	}

	// 인증된 사용자는 /auth/* 경로만 접근 가능
	if (pathname.startsWith('/auth/')) {
		return NextResponse.next();
	}
	// 그 외 경로는 모두 /auth/mypage로 리다이렉트
	const mypageUrl = req.nextUrl.clone();
	mypageUrl.pathname = '/auth/mypage';
	return NextResponse.redirect(mypageUrl);
}

export const config = {
	matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
