'use client';

import {useContext} from 'react';
import {TemplateContext} from './template';
import {LayoutContext} from './layout';
import Container from '@/components/Container';

export default function Clone() {
	const templateContext = useContext(TemplateContext);
	const layoutContext = useContext(LayoutContext);
	return (
		<Container>
			<div className='font-bold'>template.tsx에서 받은 값</div>
			<div>{templateContext}</div>
			<div className='font-bold'>layout.tsx에서 받은 값</div>
			<div>{layoutContext}</div>
		</Container>
	);
}
