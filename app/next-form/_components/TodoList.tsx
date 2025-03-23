import React, {useState} from 'react';
import {useTodo} from '../_context/TodoContext';

const TodoList = ({
	fetchData = [],
	setFetchData,
}: {
	fetchData: any[];
	setFetchData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const {formatDate} = useTodo();

	const handleToggle = async (todo: any) => {
		console.log(todo);
		try {
			const updatedTodo = {...todo, completed: !todo.completed};

			const response = await fetch(`/api/todo/completed?date=${formatDate}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(updatedTodo),
			});

			if (!response.ok) throw new Error('업데이트 실패');

			setFetchData((prev) =>
				prev.map((item) =>
					item.id === todo.id ? {...item, completed: !item.completed} : item,
				),
			);
		} catch (error) {
			console.error('업데이트 실패:', error);
		}
	};

	return (
		<div className='divide-y'>
			{fetchData.length === 0 ? (
				<div>현재 todo가 없습니다.</div>
			) : (
				fetchData.map((todo) => (
					<label
						htmlFor={`todo-${todo.id}`}
						key={todo.id}
						className='flex justify-between items-center cursor-pointer'>
						<div className='my-1'>
							<p>{todo.title}</p>
							<p className='text-xs text-gray-600'>{formatDate}</p>
						</div>
						<div>
							<TodoInput todoData={todo} onToggle={handleToggle} />
						</div>
					</label>
				))
			)}
		</div>
	);
};

export default TodoList;

function TodoInput({todoData, onToggle}: any) {
	const [checked, setChecked] = useState<boolean>(todoData?.completed ?? false);

	const handleToggle = () => {
		setChecked((prev) => !prev);
		onToggle(todoData); // 부모 컴포넌트로 toggle을 전달하여 API 호출
	};

	return (
		todoData && (
			<input
				id={`todo-${todoData.id}`}
				type='checkbox'
				checked={checked}
				onChange={handleToggle} // 토글 시 handleToggle 호출
			/>
		)
	);
}
