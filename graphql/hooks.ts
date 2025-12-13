import { useQuery } from "@apollo/client";
import { GET_POKEMONS, GET_POKEMON_DETAILS, GET_POKEMONS_BY_TYPE, SEARCH_POKEMONS } from './queries';
import { GetPokemonsData, GetPokemonDetailsData, formatPokemon } from './types';

// Hook para buscar lista de Pokémons
export const useGetPokemons = (limit: number = 20, offset: number = 0) => {
    const { loading, error, data, fetchMore } = useQuery<GetPokemonsData>(GET_POKEMONS, {
        variables: { limit, offset },
    });

    const pokemons = data?.pokemon_v2_pokemon.map(formatPokemon) || [];

    return {
        loading,
        error,
        pokemons,
        fetchMore,
    };
};

// Hook para buscar detalhes de um Pokémon
export const useGetPokemonDetails = (id: number) => {
    const { loading, error, data } = useQuery<GetPokemonDetailsData>(GET_POKEMON_DETAILS, {
        variables: { id },
        skip: !id,
    });

    const pokemon = data?.pokemon_v2_pokemon[0];

    return {
        loading,
        error,
        pokemon,
    };
};

// Hook para buscar Pokémons por tipo
export const useGetPokemonsByType = (typeName: string, limit: number = 20) => {
    const { loading, error, data } = useQuery<GetPokemonsData>(GET_POKEMONS_BY_TYPE, {
        variables: { typeName: typeName.toLowerCase(), limit },
        skip: !typeName || typeName === 'ALL',
    });

    const pokemons = data?.pokemon_v2_pokemon.map(formatPokemon) || [];

    return {
        loading,
        error,
        pokemons,
    };
};

// Hook lazy para buscar Pokémons (para search)
export const useSearchPokemons = () => {
    const { loading, error, data, refetch } = useQuery<GetPokemonsData>(SEARCH_POKEMONS, {
        skip: true,
    });

    const searchPokemons = (name: string) => {
        if (name.trim()) {
            refetch({ name: `%${name}%` });
        }
    };

    const pokemons = data?.pokemon_v2_pokemon.map(formatPokemon) || [];

    return {
        searchPokemons,
        loading,
        error,
        pokemons,
    };
};
