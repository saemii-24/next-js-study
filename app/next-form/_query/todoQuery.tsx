import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';

export interface TodoType {
	id: number;
	title: string;
	completed: boolean;
}

// 📌GET 요청
export function useGetTodoQuery() {
	const getTodo = useSuspenseQuery<TodoType[], Error>({
		queryKey: ['todo'],
		queryFn: async (): Promise<TodoType[]> => {
			const fetchData = await fetch('/api/todo', {
				method: 'GET',
			});
			const response = await fetchData.json();
			return response;
		},
	});

	return {
		todoData: getTodo.data,
		todoRefetch: getTodo.refetch,
	};
}

// 📌POST 요청
export function usePostMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({date, ...todo}: TodoType & {date: string}) => {
			const response = await fetch(`/api/todo?date=${date}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			});
			if (!response.ok) {
				throw new Error('todo를 추가하지 못했습니다.');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['todo']});
		},
	});

	return {
		postTodo: mutation.mutate,
		postTodoError: mutation.isError,
		postTodoSuccess: mutation.isSuccess,
	};
}

// 📌PUT 요청
export function usePutMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (todo: TodoType) => {
			const response = await fetch(`/api/todo`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			});
			if (!response.ok) {
				throw new Error('todo를 업데이트하지 못했습니다.');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['todo']});
		},
	});

	return {
		putTodo: mutation.mutate,
		putTodoError: mutation.isError,
		putTodoSuccess: mutation.isSuccess,
	};
}

// 📌DELETE 요청
export function useDeleteMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({date, id}: {date: string; id: number}) => {
			const response = await fetch(`/api/todo?date=${date}&id=${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('todo를 삭제하지 못했습니다.');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['todo']});
		},
	});

	return {
		deleteTodo: mutation.mutate,
		deleteTodoError: mutation.isError,
		deleteTodoSuccess: mutation.isSuccess,
	};
}
