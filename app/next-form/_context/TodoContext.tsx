import React, {createContext, ReactNode, useContext} from 'react';
import {
	TodoType,
	useGetTodoQuery,
	usePutMemberQuery,
} from '../_query/todoQuery';
import {UseMutateFunction} from '@tanstack/react-query';

interface TodoContextType {
	todoData: TodoType[];
	putTodo: UseMutateFunction<any, Error, TodoType, unknown>;
	formatDate: string;
}

const TodoContext = createContext<TodoContextType | null>(null);

interface TodoProviderProps {
	children: ReactNode;
}

//Context 만들어서 제공
export const TodoProvider = ({children}: TodoProviderProps) => {
	const today = new Date();
	const formatDate = today
		.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.replace(/\. /g, '-')
		.replace('.', '');

	// 기존 todo 정보 불러오기
	const {todoData} = useGetTodoQuery({date: formatDate});
	const {putTodo} = usePutMemberQuery();

	return (
		<TodoContext.Provider value={{todoData, putTodo, formatDate}}>
			{children}
		</TodoContext.Provider>
	);
};

//실제  Context 정보 사용
export const useTodo = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error('TodoProvider가 필요합니다.');
	}
	return context;
};
