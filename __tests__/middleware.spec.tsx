import {middleware} from 'middleware';
import {NextRequest, NextResponse, userAgent} from 'next/server';

jest.mock('next/server', () => {
	return {
		userAgent: jest.fn(),
		NextRequest: jest.fn(),
		NextResponse: {
			redirect: jest.fn().mockReturnValue({}),
			next: jest.fn(),
		},
	};
});

describe('Middleware의 작동을 테스트 한다.', () => {
	let mockRequest: Partial<NextRequest>;

	beforeEach(() => {
		// 모킹 함수를 초기화하여 이전 테스트 영향을 받지 않도록 한다.
		jest.clearAllMocks();

		// mockRequest 설정
		mockRequest = {
			nextUrl: {
				pathname: '/',
			},
			url: 'http://localhost:3000', // mockRequest.url 설정
		} as NextRequest;
	});

	it('모바일 사이즈라면, (/) 페이지에서 (/mobile-home)으로 이동해야 한다.', () => {
		// 모바일 디바이스로 설정
		(userAgent as jest.Mock).mockReturnValueOnce({
			device: {type: 'mobile'},
		});

		// 미들웨어 실행
		const response = middleware(mockRequest as NextRequest);

		// 현재 경로가 루트인지 확인
		expect(mockRequest.nextUrl!.pathname).toBe('/');

		// '/mobile-home'으로 리디렉션이 발생해야 한다.
		expect(NextResponse.redirect).toHaveBeenCalledWith(
			expect.objectContaining({
				pathname: '/mobile-home',
			}),
		);
	});

	it('PC 사이즈라면, (/) 페이지에서 (/mobile-home)으로 이동하지 않는다.', () => {
		// userAgent를 활용해 PC 디바이스로 설정한다.
		(userAgent as jest.Mock).mockReturnValueOnce({
			device: {type: 'desktop'},
		});

		// 현재 경로가 루트인지 확인한다.
		expect(mockRequest.nextUrl!.pathname).toBe('/');

		// 미들웨어를 실행한다.
		const response = middleware(mockRequest as NextRequest);

		// 리디렉션이 발생하지 않아야 한다.
		expect(NextResponse.redirect).not.toHaveBeenCalled();
	});
});
