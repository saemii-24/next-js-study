// 'use client';
import Container from '@/components/Container';
import {Suspense, use, useEffect, useState} from 'react';

// function Fetch() {
// 	// 로딩 여부 상태
// 	const [isLoading, setIsLoading] = useState(true);
// 	// 에러 여부 상태
// 	const [isError, setIsError] = useState(false);
// 	// 가져온 데이터 저장
// 	const [data, setData] = useState();

// 	const [refetch, setRefetch] = useState<boolean>(false);

// 	// url이 바뀔 때마다 데이터 fetch
// 	useEffect(() => {
// 		setIsError(false); // 에러 상태 초기화
// 		setIsLoading(true); // 로딩 시작
// 		setData(undefined); // 이전 데이터 초기화

// 		fetch('/api/use')
// 			.then((res) => res.json()) // 응답을 JSON으로 파싱
// 			.then(setData) // 데이터 저장
// 			.catch(() => setIsError(true)) // 에러 발생 시 에러 상태 true
// 			.finally(() => setIsLoading(false)); // 로딩 종료
// 	}, [refetch]); // 의존성: url이 변경될 때마다 재실행

// 	return (
// 		<div>
// 			<button
// 				onClick={() => setRefetch(!refetch)}
// 				className='py-2 text-center text-white bg-blue-500 cursor-pointer my-4 w-full rounded-md hover:bg-blue-600'>
// 				데이터 불러오기
// 			</button>

// 			{isLoading ? (
// 				<h1>fetch로 로딩중...</h1>
// 			) : isError ? (
// 				<h1>Error</h1>
// 			) : (
// 				<div className='space-y-4'>
// 					{data?.map((item: any, index: number) => {
// 						return (
// 							<div key={index} className='border rounded-md p-4'>
// 								<h3>{item.name}</h3>
// 								<p>{item.age}</p>
// 								<p>{item.address}</p>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			)}
// 		</div>
// 	);
// }

const Use = () => {
	const data = use(
		fetch('/api/use', {method: 'GET'}).then((res) => console.log(res)),
	);

	return (
		<div>
			{/* <div className='space-y-4'>
				{data?.map((item: any, index: number) => {
					return (
						<div key={index} className='border rounded-md p-4'>
							<h3>{item.name}</h3>
							<p>{item.age}</p>
							<p>{item.address}</p>
						</div>
					);
				})}
			</div> */}
		</div>
	);
};

export default function FetchPage() {
	return (
		<Container>
			<Container.Title>Fetch</Container.Title>
			{/* <Fetch /> */}
			<Suspense fallback={<div>use로 로딩중...</div>}>
				<Use />
			</Suspense>
		</Container>
	);
}
