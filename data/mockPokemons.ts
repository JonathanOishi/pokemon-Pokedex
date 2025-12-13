export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

export const mockPokemons: Pokemon[] = [
    {
        id: 1,
        name: 'Bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: ['GRASS', 'POISON'],
    },
    {
        id: 2,
        name: 'Ivysaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        types: ['GRASS', 'POISON'],
    },
    {
        id: 3,
        name: 'Venusaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
        types: ['GRASS', 'POISON'],
    },
    {
        id: 4,
        name: 'Charmander',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        types: ['FIRE'],
    },
    {
        id: 5,
        name: 'Charmeleon',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        types: ['FIRE'],
    },
    {
        id: 6,
        name: 'Charizard',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        types: ['FIRE', 'FLYING'],
    },
    {
        id: 7,
        name: 'Squirtle',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        types: ['WATER'],
    },
    {
        id: 8,
        name: 'Wartortle',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
        types: ['WATER'],
    },
    {
        id: 9,
        name: 'Blastoise',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        types: ['WATER'],
    },
    {
        id: 25,
        name: 'Pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        types: ['ELECTRIC'],
    },
];
