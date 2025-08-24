'use client';

import Card from './_components/Card';
import Image from 'next/image';
import { usePokemon } from './_swr/usePokemon';

export default function PokemonPage() {
	const { 
		pokemon, 
		isLoading, 
		isValidating,
		isError, 
		errorMessage, 
		errorStatus,
		refetch 
	} = usePokemon(1);

	if (isLoading) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<div className="text-lg">🔍 포켓몬 데이터를 불러오는 중...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="h-screen w-screen flex items-center justify-center p-6">
				<div className="text-center space-y-4">
					<div className="text-red-600 text-xl">⚠️ 에러가 발생했습니다</div>
					<div className="text-gray-600">
						{errorMessage || '알 수 없는 오류가 발생했습니다'}
					</div>
					{errorStatus && (
						<div className="text-sm text-gray-500">
							상태 코드: {errorStatus}
						</div>
					)}
					<button
						onClick={() => refetch()}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						다시 시도
					</button>
				</div>
			</div>
		);
	}

	if (!pokemon) return null;

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

	const topBadges = pokemon.types.map((t) => ({
		label: t.type.name,
		color: typeColorMap[t.type.name] ?? undefined,
	}));

	const categories = pokemon.abilities.map((a) => a.ability.name);

	const description = (
		<div className='flex flex-col items-center gap-2'>
			<Image
				src={pokemon.sprites.front_default}
				alt={pokemon.name}
				width={100}
				height={200}
			/>
			<div className='text-sm text-gray-600'>
				Height: {pokemon.height} | Weight: {pokemon.weight}
			</div>
		</div>
	);

	return (
		<div className='h-screen w-screen flex items-center justify-center p-6'>
			<div className='w-full max-w-lg'>
				{/* 데이터 재검증 중일 때 표시 */}
				{isValidating && (
					<div className="mb-4 text-center text-blue-600 text-sm">
						🔄 데이터를 업데이트하는 중...
					</div>
				)}
				
				<Card
					href='#'
					title={<span className='capitalize'>{pokemon.name}</span>}
					description={description}
					topBadges={topBadges}
					categories={categories}
				/>
				
				{/* 수동 새로고침 버튼 */}
				<div className="mt-4 text-center">
					<button
						onClick={() => refetch()}
						disabled={isValidating}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
					>
						{isValidating ? '새로고침 중...' : '데이터 새로고침'}
					</button>
				</div>
			</div>
		</div>
	);
}
