import {withSwagger} from 'next-swagger-doc';

const swaggerHandler = withSwagger({
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'NextJS Swagger',
			version: '0.1.0',
		},
	},
	apiFolder: 'app/api', // Swagger 문서화할 API 라우터 폴더
});

export const GET = swaggerHandler();
