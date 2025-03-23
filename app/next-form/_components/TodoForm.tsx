import React from 'react';
import Form from 'next/form';
import {useActionState} from 'react';
import {TodoProvider, useTodo} from '../_context/TodoContext';

const TodoForm = ({
	setFetchData,
}: {
	setFetchData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const [todo, formAction, isPending] = useActionState(createTodo, {});
	const {formatDate} = useTodo();

	async function createTodo(_: any, formData: FormData): Promise<any> {
		const title = formData.get('title');

		const response = await fetch('/api/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				date: formatDate,
			}),
		});

		const newTodo = await response.json();
		setFetchData((prev) => [...prev, newTodo]);

		return newTodo;
	}

	return (
		<Form action={formAction} className='flex gap-2 mt-5 border-t '>
			<div className='pt-2'>
				<div className='gap-2 flex'>
					<input
						placeholder='해야 할 일을 적어주세요'
						name='title'
						className='outline-none  w-full border-gray-400 py-1 '
					/>
					<button
						type='submit'
						disabled={isPending}
						className=' disabled:text-gray-400 text-black shrink-0 w-20 text-end cursor-pointer '>
						{isPending ? '제출중' : '제출'}
					</button>
				</div>
			</div>
		</Form>
	);
};

export default TodoForm;
