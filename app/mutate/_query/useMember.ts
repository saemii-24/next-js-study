import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';

export interface MemberType {
	id: number;
	name: string;
	position: string;
}

export function getMembersQuery() {
	const getMembers = useSuspenseQuery<MemberType[], Error>({
		queryKey: ['members'],
		queryFn: async (): Promise<MemberType[]> => {
			const fetchData = await fetch('/api/mutate', {
				method: 'GET',
			});
			const fetchDataJson = await fetchData.json();
			return fetchDataJson;
		},
	});

	return {
		membersData: getMembers.data,
		membersIsLoading: getMembers.isLoading,
		membersIsError: getMembers.isError,
		membersIsSuccess: getMembers.isSuccess,
		membersRefetch: getMembers.refetch,
	};
}

export function deleteMembersQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (memberId: number) => {
			const response = await fetch(`/api/mutate?memberId=${memberId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete member');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['members']});
		},
	});

	return {
		deleteMember: mutation.mutate,
		membersIsError: mutation.isError,
		membersIsSuccess: mutation.isSuccess,
	};
}

export function postMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (member: MemberType) => {
			const response = await fetch(`/api/mutate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(member),
			});
			if (!response.ok) {
				throw new Error('Failed to add member');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['members']});
		},
	});

	return {
		postMember: mutation.mutate,
		membersIsError: mutation.isError,
		membersIsSuccess: mutation.isSuccess,
	};
}

export function putMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (member: MemberType) => {
			const response = await fetch(`/api/mutate`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(member),
			});
			if (!response.ok) {
				throw new Error('Failed to add member');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['members']});
		},
	});

	return {
		putMember: mutation.mutate,
		membersIsError: mutation.isError,
		membersIsSuccess: mutation.isSuccess,
	};
}
