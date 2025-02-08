'use client';
import Container from '@/components/Container';
import {getMembersQuery} from './_query/useMember';
import {Suspense} from 'react';

export default function Mutate() {
	const {membersData} = getMembersQuery();
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
				<div
					popover='manual'
					id='delete-popover'
					className='relative inset-y-0 mx-auto my-auto transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left opacity-0 shadow-xl transition-all [transition-behavior:allow-discrete] duration-500 sm:w-full sm:max-w-96 sm:p-6 dark:bg-gray-800 [&:is([open],:popover-open)]:opacity-100 [@starting-style]:[&:is([open],:popover-open)]:opacity-0'>
					삭제하시겠습니까?
				</div>
			</Suspense>
		</Container>
	);
}
