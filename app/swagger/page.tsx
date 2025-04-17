import {createSwaggerSpec} from 'next-swagger-doc';
import 'swagger-ui-react/swagger-ui.css';
import SwaggerUI from 'swagger-ui-react';

const SwaggerPage = async () => {
	const spec = createSwaggerSpec({
		definition: {
			openapi: '3.0.0', //오픈 api 규격
			info: {
				title: 'Swagger 샘플 만들어보기',
				version: '1.0', //내가 만든 api 문서 버전
			},
		},
		apiFolder: 'app/api', // Swagger 문서화할 API 라우터가 위치한 폴더를 반드시 적어줘야 함!
	});

	return <SwaggerUI spec={spec} />;
};

export default SwaggerPage;
