import React from 'react';
import {Suspense} from 'react';
import {useTodo} from '../_context/TodoContext';

const TodoList = () => {
	const {todoData, putTodo, formatDate} = useTodo();

	const render = () => {
		if (todoData.length === 0) {
			return <div>현재 todo가 없습니다.</div>;
		} else {
			return (
				<Suspense fallback={<div>todo 로딩중</div>}>
					<div className='divide-y'>
						{todoData.map((todo) => (
							<div key={todo.id}>
								<p>{todo.title}</p>
								<p className=''>{formatDate}</p>
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
						))}
					</div>
				</Suspense>
			);
		}
	};

	return <>{render()}</>;
};

export default TodoList;
