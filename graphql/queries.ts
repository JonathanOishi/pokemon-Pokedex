import { gql } from '@apollo/client';

// Query para buscar lista de Pokémons
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

// Query para buscar detalhes de um Pokémon específico
export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(limit: 1, where: { language_id: { _eq: 9 } }) {
          flavor_text
        }
      }
    }
  }
`;

// Query para buscar Pokémons por tipo
export const GET_POKEMONS_BY_TYPE = gql`
  query GetPokemonsByType($typeName: String!, $limit: Int!) {
    pokemon_v2_pokemon(
      where: { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $typeName } } } }
      limit: $limit
      order_by: { id: asc }
    ) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

// Query para buscar Pokémons por nome (search)
export const SEARCH_POKEMONS = gql`
  query SearchPokemons($name: String!) {
    pokemon_v2_pokemon(where: { name: { _ilike: $name } }, limit: 20, order_by: { id: asc }) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;
