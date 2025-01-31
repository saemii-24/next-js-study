'use client';
import Container from '@/components/Container';
import {useState} from 'react';
import {cn} from 'utils/cn';

export default function Disabled() {
	const [isActive, setIsActive] = useState<string>('disabled');

	return (
		<Container>
			<Container.Title>Inert</Container.Title>
			<div className='flex **:py-1 **:px-2  **:rounded-sm  **:cursor-pointer gap-4 mt-3'>
				<button
					className={cn('bg-gray-100', {'bg-sky-100': isActive === 'disabled'})}
					onClick={() => {
						setIsActive('disabled');
					}}>
					폼 비활성화
				</button>
				<button
					className={cn('bg-gray-100', {'bg-sky-100': isActive === 'active'})}
					onClick={() => {
						setIsActive('active');
					}}>
					활성화
				</button>
			</div>
			<form className='mt-3'>
				<legend>상단 버튼을 눌러 확인해보세요</legend>
				<fieldset>
					<input type='checkbox' id='sunflower' />
					<label htmlFor='sunflower'>해바라기 반</label>
				</fieldset>

				<fieldset
					inert={isActive === 'disabled' ? true : false}
					className='inert:opacity-50'>
					<input type='checkbox' id='rose' />
					<label htmlFor='rose'>장미 반</label>
				</fieldset>
			</form>
		</Container>
	);
}
