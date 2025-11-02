import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: '',
			credentials: {
				entranceCode: {label: 'Entrance Code', type: 'text'},
			},
			async authorize(credentials) {
				// 실제 코드 값은 환경변수 등으로 관리하세요!
				const validCode = process.env.ENTRANCE_CODE;
				if (credentials?.entranceCode === validCode) {
					// 세션에 저장할 사용자 정보
					return {id: 'test', name: 'Test User'};
				}
				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/signin',
	},
});

export {handler as GET, handler as POST};
