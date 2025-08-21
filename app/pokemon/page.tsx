'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PokemonPage() {
	const {data, error, isLoading} = useSWR(
		'https://pokeapi.co/api/v2/pokemon/1', // 1번 포켓몬(이상해씨)
		fetcher,
	);

	console.log(data);
	if (isLoading) return <div>로딩중...</div>;
	if (error) return <div>에러 발생</div>;
	if (!data) return null;

	return <div></div>;
}
