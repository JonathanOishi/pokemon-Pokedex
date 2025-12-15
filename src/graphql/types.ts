// Tipos para os dados retornados pela API GraphQL

export interface PokemonType {
    pokemon_v2_type: {
        name: string;
    };
}

export interface PokemonSprite {
    sprites: string | any;
}

export interface PokemonAbility {
    pokemon_v2_ability: {
        name: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    pokemon_v2_stat: {
        name: string;
    };
}

export interface PokemonFlavorText {
    flavor_text: string;
}

export interface PokemonSpecies {
    pokemon_v2_pokemonspeciesflavortexts: PokemonFlavorText[];
}

export interface PokemonData {
    id: number;
    name: string;
    height?: number;
    weight?: number;
    pokemon_v2_pokemontypes: PokemonType[];
    pokemon_v2_pokemonsprites: PokemonSprite[];
    pokemon_v2_pokemonabilities?: PokemonAbility[];
    pokemon_v2_pokemonstats?: PokemonStat[];
    pokemon_v2_pokemonspecy?: PokemonSpecies;
}

export interface GetPokemonsData {
    pokemon_v2_pokemon: PokemonData[];
}

export interface GetPokemonDetailsData {
    pokemon_v2_pokemon: PokemonData[];
}

// Helper para extrair a URL da sprite
export const getPokemonImageUrl = (pokemon: PokemonData): string => {
    if (pokemon.pokemon_v2_pokemonsprites.length > 0) {
        const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;

        // Tenta pegar a imagem oficial primeiro
        if (typeof sprites === 'object' && sprites !== null) {
            const officialArtwork = sprites?.other?.['official-artwork']?.front_default;
            if (officialArtwork) return officialArtwork;

            const dreamWorld = sprites?.other?.dream_world?.front_default;
            if (dreamWorld) return dreamWorld;

            if (sprites?.front_default) return sprites.front_default;
        }
    }

    // Fallback para imagem direta da PokeAPI
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
};

// Helper para extrair os tipos do Pokémon
export const getPokemonTypes = (pokemon: PokemonData): string[] => {
    return pokemon.pokemon_v2_pokemontypes.map(
        (typeObj) => typeObj.pokemon_v2_type.name.toUpperCase()
    );
};

// Helper para formatar o Pokémon para uso na aplicação
export const formatPokemon = (pokemon: PokemonData) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: getPokemonImageUrl(pokemon),
        types: getPokemonTypes(pokemon),
    };
};
