'use client';

import useSWR from 'swr';
import Card from './_components/Card';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PokemonPage() {
	const {data, error, isLoading} = useSWR(
		'https://pokeapi.co/api/v2/pokemon/1',
		fetcher,
	);

	if (isLoading) return <div>로딩중...</div>;
	if (error) return <div>에러 발생</div>;
	if (!data) return null;

	// 타입에 따라 카드 배지 색상을 매핑
	const typeColorMap: Record<string, string> = {
		grass: 'green',
		fire: 'red',
		water: 'blue',
		electric: 'yellow',
		normal: 'gray',
		rock: 'orange',
		ground: 'orange',
		bug: 'green',
		poison: 'purple',
		flying: 'gray',
		ice: 'blue',
		fairy: 'pink',
		fighting: 'red',
		psychic: 'yellow',
	};

	const topBadges = data.types.map((t: any) => ({
		label: t.type.name,
		color: typeColorMap[t.type.name] ?? undefined,
	}));

	const categories = data.abilities.map((a: any) => a.ability.name);

	const description = (
		<div className='flex flex-col items-center gap-2'>
			<Image
				src={data.sprites.front_default}
				alt={data.name}
				width={100}
				height={200}
			/>
			<div className='text-sm text-gray-600'>
				Height: {data.height} | Weight: {data.weight}
			</div>
		</div>
	);

	return (
		<div className='h-screen w-screen flex items-center justify-center p-6'>
			<div className='w-full max-w-lg'>
				<Card
					href='#'
					title={<span className='capitalize'>{data.name}</span>}
					description={description}
					topBadges={topBadges}
					categories={categories}
				/>
			</div>
		</div>
	);
}
