'use client';
import Container from '@/components/Container';
import {
	deleteMembersQuery,
	getMembersQuery,
	postMemberQuery,
} from './_query/useMember';
import {Suspense} from 'react';
import {useActionState} from 'react';

interface MemberType {
	id: number;
	name: string;
	birth: number; // 형식에 따라 수정
	height: number;
}

export default function Mutate() {
	const {membersData} = getMembersQuery();
	const {deleteMember} = deleteMembersQuery();
	const {postMember} = postMemberQuery();

	function makeBirth(birth: number) {
		const birthStr = birth.toString();
		const year = birthStr.substring(0, 2);
		const month = birthStr.substring(2, 4);
		const day = birthStr.substring(4, 6);
		return `${year}년 ${month}월 ${day}일`;
	}

	// update 함수 정의
	async function update(
		prev: unknown,
		formData: FormData,
	): Promise<MemberType> {
		const originBirth = formData.get('birth') as string;
		const birthDate = new Date(originBirth);
		const year = String(birthDate.getFullYear()).slice(-2);
		const month = String(birthDate.getMonth() + 1).padStart(2, '0');
		const date = String(birthDate.getDate()).padStart(2, '0');

		const newMember: MemberType = {
			id: Math.random(),
			name: formData.get('name') as string,
			birth: Number(`${year}${month}${date}`), // YYMMDD 형식으로 변환
			height: Number(formData.get('height')),
		};

		console.log('New Member:', newMember); // 새 멤버
		postMember(newMember); // 비동기 호출
		return newMember;
	}

	const [state, formAction, isPending] = useActionState(update, undefined);

	return (
		<Container>
			<Container.Title>Tanstack Query mutation</Container.Title>
			<h2 className='text-xl font-semibold mt-8'>떡잎마을 방범대 멤버</h2>
			<Suspense fallback={<div>로딩 중...</div>}>
				<table className='table-auto w-full mt-3'>
					<thead className='border-b'>
						<tr>
							<th>이름</th>
							<th>생일</th>
							<th>키</th>
						</tr>
					</thead>
					<tbody>
						{membersData.map((member) => (
							<tr
								onClick={() => {
									deleteMember(member.id);
								}}
								key={member.id}
								className='hover:bg-red-50 cursor-pointer'>
								<td className='text-center'>{member.name}</td>
								<td className='text-center'>{makeBirth(member.birth)}</td>
								<td className='text-center'>{member.height}cm</td>
							</tr>
						))}
					</tbody>
				</table>
			</Suspense>

			<h2 className='text-xl font-semibold mt-8'>떡잎마을 방범대 멤버 추가</h2>
			<form className='mt-2' action={formAction}>
				<div className='grid grid-cols-[40px_1fr] gap-2 items-center'>
					<label htmlFor='name'>이름</label>
					<input
						type='text'
						id='name'
						name='name'
						className='border border-gray-200 px-2 py-1'
					/>
					<label htmlFor='birth'>생일</label>
					<input
						type='date'
						id='birth'
						name='birth'
						className='border border-gray-200 px-2 py-1'
					/>
					<label htmlFor='height'>키</label>
					<input
						type='number'
						id='height'
						name='height'
						className='border border-gray-200 px-2 py-1'
					/>
				</div>
				<button
					type='submit'
					className='w-full text-center bg-blue-500 text-white h-8 rounded-md mt-3 cursor-pointer hover:bg-blue-500/70'>
					추가하기
				</button>
			</form>
		</Container>
	);
}
