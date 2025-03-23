'use client';
import React, {useEffect, useState} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import {TodoProvider, useTodo} from '../_context/TodoContext';
import Container from '@/components/Container';
import {formatDate} from '../_lib/formatDate';

export default function NextForm() {
	// const {formatDate} = useTodo();
	const [fetchData, setFetchData] = useState<any[]>([]);

	useEffect(() => {
		async function fetchTodos() {
			try {
				const response = await fetch(`/api/todo?date=${formatDate}`);

				const data = await response.json();
				setFetchData(data);
			} catch (error) {
				console.error('Failed to fetch todos:', error);
			}
		}

		fetchTodos();
	}, []);

	return (
		<TodoProvider>
			<Container>
				<Container.Title>
					Next 15
					<br />
					Form Component
				</Container.Title>
				<h1 className='text-center text-2xl mt-10'>To do List</h1>
				<TodoList fetchData={fetchData ?? []} setFetchData={setFetchData} />
				<TodoForm setFetchData={setFetchData} />
			</Container>
		</TodoProvider>
	);
}
