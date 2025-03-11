'use client';
import Container from '@/components/Container';
import Form from 'next/form';
import {useGetTodoQuery, usePutMemberQuery} from './_query/todoQuery';
import {Suspense} from 'react';

export default function NextForm() {
	//date format 변경
	const today = new Date();
	const formatDate = today.toISOString().toString().slice(0, 10);

	//기존 todo 정보 불러오기
	const {todoData} = useGetTodoQuery({date: formatDate});

	//기존 todo 업데이트하기
	const {putTodo} = usePutMemberQuery();

	return (
		<Container>
			<Container.Title>
				Next 15
				<br />
				Form Component
			</Container.Title>

			<h1 className='text-center text-2xl mt-10'>To do List</h1>
			{/* 기존 todo 렌더링 */}
			<Suspense fallback={<div>todo 로딩중</div>}>
				{todoData.map((todo, index) => {
					return (
						<div key={todo.id} className='divide-y'>
							<p>{todo.title}</p>
							<p>{formatDate}</p>
							<div>
								<input
									type='checkbox'
									checked={todo.completed}
									onChange={() => {
										putTodo({
											id: todo.id,
											title: todo.title,
											completed: !todo.completed,
										});
									}}
								/>
							</div>
						</div>
					);
				})}
			</Suspense>

			{/* 새로운 todo 작성*/}
			<Form action='/data'>
				<label htmlFor='title'>해야할 일</label>
				<input name='title' />
				<button type='submit'>Submit</button>
			</Form>
		</Container>
	);
}
