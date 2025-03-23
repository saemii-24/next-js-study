import Form from 'next/form';
import React from 'react';

const KoreaForm = () => {
	return (
		<Form action='/next-form/seoul' replace={false}>
			<input name='district' placeholder='서울의 자치구 이름을 입력해보세요' />
			<button type='submit'>검색</button>
			<p>ex) 강남구</p>
		</Form>
	);
};

export default KoreaForm;
