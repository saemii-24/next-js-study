'use client';
import React, {useActionState} from 'react';

interface PeopleInfoType {
	username: string;
	job: string;
	team: string;
}

let peopleData: PeopleInfoType[] = [];

async function submitHandler(
	previousState: PeopleInfoType,
	formData: FormData,
): Promise<PeopleInfoType> {
	const username = formData.get('username') as string;
	const job = formData.get('job') as string;
	const team = formData.get('team') as string;
	peopleData.push({username, job, team});
	console.log(peopleData);

	return {username, job, team};
}

export default function Form() {
	const [state, formAction, isPending] = useActionState<
		PeopleInfoType,
		FormData
	>(submitHandler, {username: '', job: '', team: ''});

	return (
		<form action={formAction} className='p-4 border rounded-lg w-80'>
			{/* 🔸 fieldset & legend */}
			<fieldset className='border border-blue-500 rounded-md p-4'>
				<legend className='font-bold text-blue-500'>팀원 정보</legend>

				<label className='block mt-2'>
					이름
					<input
						type='text'
						name='username'
						required
						className='w-full p-2 border rounded'
					/>
				</label>

				{/* 🔸 datalist 활용 */}
				<label className='block mt-2'>
					소속 팀
					<input
						list='teamList'
						name='team'
						className='w-full p-2 border rounded'
					/>
					<datalist id='teamList'>
						<option value='개발실' />
						<option value='기획실' />
						<option value='디자인실' />
						<option value='기타' />
					</datalist>
				</label>

				<label className='block mt-2'>
					직무
					<select name='job' className='w-full p-2 border rounded'>
						<optgroup label='개발자'>
							<option value='시스템 개발자'>시스템 개발자</option>
							<option value='프론트엔드 개발자'>프론트엔드 개발자</option>
							<option value='백엔드 개발자'>백엔드 개발자</option>
						</optgroup>
						<optgroup label='기획자'>
							<option value='콘텐츠 기획자'>콘텐츠 기획자</option>
							<option value='서비스 기획자'>서비스 기획자</option>
						</optgroup>
						<optgroup label='디자이너'>
							<option value='UX 디자이너'>UX 디자이너</option>
							<option value='UI 디자이너'>UI 디자이너</option>
						</optgroup>
						<option value='기타'>기타</option>
					</select>
				</label>
			</fieldset>

			<button
				type='submit'
				className='mt-4 w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-500/70'
				disabled={isPending}>
				{isPending ? '제출 중...' : '제출'}
			</button>
		</form>
	);
}
