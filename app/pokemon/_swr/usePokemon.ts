import useSWR from 'swr';

// 커스텀 에러 클래스
export class PokemonFetchError extends Error {
  status: number;
  info?: any;

  constructor(message: string, status: number, info?: any) {
    super(message);
    this.name = 'PokemonFetchError';
    this.status = status;
    this.info = info;
  }
}

//  fetcher 함수
const fetcher = async (url: string): Promise<Pokemon> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorInfo = await response.text();
      throw new PokemonFetchError(
        `포켓몬 데이터를 가져오는데 실패했습니다: ${response.status}`,
        response.status,
        errorInfo
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof PokemonFetchError) {
      throw error;
    }
    
    // 네트워크 오류나 기타 오류
    throw new PokemonFetchError(
      `네트워크 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      0,
      error
    );
  }
};

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export function usePokemon(pokemonId: number | string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Pokemon, PokemonFetchError>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1분간 중복 요청 방지
    }
  );

  return {
    pokemon: data,
    isLoading,
    isValidating,
    error,
    isError: !!error,
    errorMessage: error?.message || null,
    errorStatus: error?.status || null,
    refetch: mutate,
  };
}
