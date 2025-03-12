'use client';
import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import {TodoProvider} from '../_context/TodoContext';
import Container from '@/components/Container';

export default function NextForm() {
	return (
		<TodoProvider>
			<Container>
				<Container.Title>
					Next 15
					<br />
					Form Component
				</Container.Title>

				<h1 className='text-center text-2xl mt-10'>To do List</h1>

				<TodoList />
				<TodoForm />
			</Container>
		</TodoProvider>
	);
}
