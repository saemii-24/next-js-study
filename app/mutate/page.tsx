'use client';
import Container from '@/components/Container';
import {deleteMembersQuery, getMembersQuery} from './_query/useMember';
import {Suspense} from 'react';

export default function Mutate() {
	const {membersData} = getMembersQuery();
	const {deleteMember} = deleteMembersQuery();
	function makeBirth(birth: number) {
		const birthStr = birth.toString();

		// 연도, 월, 일 추출
		const year = birthStr.substring(0, 2);
		const month = birthStr.substring(2, 4);
		const day = birthStr.substring(4, 6);

		return `${year}년 ${month}월 ${day}일`;
	}

	return (
		<Container>
			<Container.Title>Tanstack Query mutation</Container.Title>
			<Suspense fallback={<div>로딩 중...</div>}>
				{
					<table className='table-auto w-full mt-3'>
						<thead className='border-b '>
							<tr>
								<th>이름</th>
								<th>생일</th>
								<th>키</th>
							</tr>
						</thead>
						<tbody>
							{membersData.map((member) => {
								return (
									<tr
										onClick={() => {
											deleteMember(member.id);
										}}
										key={member.id}
										popoverTarget='delete-popover'
										className='hover:bg-red-50 cursor-pointer'>
										<td className='text-center'>{member.name}</td>
										<td className='text-center'>{makeBirth(member.birth)}</td>
										<td className='text-center'>{member.height}cm</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				}
			</Suspense>
		</Container>
	);
}
