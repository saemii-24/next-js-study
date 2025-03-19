import React from 'react';
import Form from 'next/form';
import {useActionState} from 'react';
import {TodoProvider, useTodo} from '../_context/TodoContext';

const TodoForm = () => {
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
		return response.json();
	}
	return (
		<Form action={formAction}>
			<label htmlFor='title'>해야할 일</label>
			<input name='title' />
			<button type='submit' disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit'}{' '}
			</button>
		</Form>
	);
};

export default TodoForm;
