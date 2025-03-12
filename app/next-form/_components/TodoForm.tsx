import React from 'react';
import Form from 'next/form';

const TodoForm = () => {
	return (
		<Form action='/data'>
			<label htmlFor='title'>해야할 일</label>
			<input name='title' />
			<button type='submit'>Submit</button>
		</Form>
	);
};

export default TodoForm;
