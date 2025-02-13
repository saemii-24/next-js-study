'use client';
import Container from '@/components/Container';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Example() {
	return (
		<QueryClientProvider client={queryClient}>
			<ExampleContent />
		</QueryClientProvider>
	);
}

function ExampleContent() {
	const makeError = () => {
		throw new Error('미상의 에러');
	};

	const fetchError = async () => {
		throw new Error('fetch 요청 중 에러 발생');
	};

	const {refetch, isError, isLoading, error} = useQuery({
		queryKey: ['tanstackError'],
		queryFn: async () => {
			const response = await fetch('/api/error', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({message: '에러 테스트'}),
			});

			if (!response.ok) {
				throw new Error(`서버 오류: ${response.status}`);
			}

			return response.json();
		},
		enabled: false,
		retry: 0,
	});

	return (
		<Container>
			<Container.Title>Error.tsx</Container.Title>
			<div className='flex flex-col gap-4 **:hover:opacity-70 **:cursor-pointer **:rounded-md **:w-full **:h-10'>
				<button
					onClick={makeError}
					className='bg-red-500 text-white p-2 rounded-md'>
					미상의 에러 발생
				</button>
				<button
					onClick={fetchError}
					className='bg-pink-500 text-white p-2 rounded-md'>
					fetch 에러 발생
				</button>
				<button
					onClick={async () => {
						await refetch();
						console.log(isError);
					}}
					className='bg-purple-500 text-white p-2 rounded-md'>
					tanstack query 에러 발생
				</button>

				{isLoading && <p className='text-gray-500'>로딩중...</p>}
				{isError && (
					<p className='text-red-500'>TanStack Query Error: {error?.message}</p>
				)}
			</div>
		</Container>
	);
}
