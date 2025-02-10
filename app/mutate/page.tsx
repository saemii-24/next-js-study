'use client';
import Container from '@/components/Container';
import {
	deleteMembersQuery,
	getMembersQuery,
	postMemberQuery,
	putMemberQuery,
} from './_query/useMember';
import {Suspense, useState} from 'react';
import {useActionState} from 'react';
import {cn} from 'utils/cn';

interface MemberType {
	id: number;
	name: string;
	position: string;
}

export default function Mutate() {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
	const {membersData} = getMembersQuery();
	const {deleteMember} = deleteMembersQuery();
	const {postMember} = postMemberQuery();
	const {putMember} = putMemberQuery();

	// update 함수 정의
	async function updateMember(
		prev: unknown,
		formData: FormData,
	): Promise<MemberType> {
		const newMember: MemberType = {
			id: selectedMember ? selectedMember.id : Math.random(),
			name: formData.get('name') as string,
			position: formData.get('position') as string,
		};

		if (selectedMember) {
			putMember(newMember); // 수정 호출
		} else {
			postMember(newMember); // 비동기 호출
		}

		// 수정 후 선택된 멤버 초기화
		setSelectedMember(null);
		setIsEditMode(false);

		return newMember;
	}

	const [state, formAction, isPending] = useActionState(
		updateMember,
		undefined,
	);

	return (
		<Container>
			<Container.Title>Tanstack Query mutation</Container.Title>
			<h2 className='text-xl font-semibold mt-8'>떡잎마을 방범대 멤버</h2>

			<Suspense fallback={<div>로딩 중...</div>}>
				<table className='table-auto w-full mt-3'>
					<thead className='border-b'>
						<tr>
							<th>이름</th>
							<th>포지션</th>
							<th>삭제</th>
							<th>수정</th>
						</tr>
					</thead>
					<tbody>
						{membersData.map((member) => (
							<tr key={member.id} className={cn('cursor-pointer ', {})}>
								<td className='text-center'>{member.name}</td>
								<td className='text-center'>{member.position}</td>
								<td className='text-center'>
									<button
										onClick={(e) => {
											e.stopPropagation();
											deleteMember(member.id);
										}}
										className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-500/70 cursor-pointer'>
										x
									</button>
								</td>
								<td className='text-center'>
									<button
										onClick={(e) => {
											e.stopPropagation();
											setSelectedMember(member);
											setIsEditMode(true);
										}}
										className='px-2 rounded-sm bg-gray-500 text-white hover:bg-gray-500/70 cursor-pointer'>
										수정
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Suspense>

			{isEditMode ? (
				<>
					<h2 className='text-xl font-semibold mt-8'>
						떡잎마을 방범대 멤버 수정{' '}
						<span
							onClick={() => {
								setIsEditMode(false);
								setSelectedMember(null);
							}}
							className='text-sm font-semibold text-gray-400 cursor-pointer'>
							되돌아가기
						</span>
					</h2>
					<form className='mt-2' action={formAction}>
						<div className='grid grid-cols-[50px_1fr] gap-2 items-center'>
							<label htmlFor='name'>이름</label>
							<input
								type='text'
								id='name'
								name='name'
								defaultValue={selectedMember ? selectedMember.name : ''}
								className='border border-gray-200 px-2 py-1'
								required
							/>
							<label htmlFor='position'>포지션</label>
							<input
								type='text'
								id='position'
								name='position'
								defaultValue={selectedMember ? selectedMember.position : ''}
								className='border border-gray-200 px-2 py-1'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full text-center bg-green-500 text-white h-8 rounded-md mt-3 cursor-pointer hover:bg-green-500/70'>
							수정하기
						</button>
					</form>
				</>
			) : (
				<>
					<h2 className='text-xl font-semibold mt-8'>
						떡잎마을 방범대 멤버 추가
					</h2>
					<form className='mt-2' action={formAction}>
						<div className='grid grid-cols-[50px_1fr] gap-2 items-center'>
							<label htmlFor='name'>이름</label>
							<input
								type='text'
								id='name'
								name='name'
								className='border border-gray-200 px-2 py-1'
								required
							/>
							<label htmlFor='position'>포지션</label>
							<input
								type='text'
								id='position'
								name='position'
								className='border border-gray-200 px-2 py-1'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full text-center bg-blue-500 text-white h-8 rounded-md mt-3 cursor-pointer hover:bg-blue-500/70'>
							추가하기
						</button>
					</form>
				</>
			)}
		</Container>
	);
}
