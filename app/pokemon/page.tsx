'use client';

import useSWR from 'swr';
import Image from 'next/image';

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

	return (
		<div className='h-screen w-screen items-center justify-center flex'>
			<div className='flex flex-col items-center  border border-2xl p-4 rounded-2xl'>
				<h1 className='font-bold'>{data.name}</h1>
				<Image
					src={data.sprites.front_default}
					alt={data.name}
					width={100}
					height={200}
				/>
				<ul className='text-sm text-center'>
					{data.abilities.map((item: any) => (
						<li key={item.ability.name}>{item.ability.name}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
