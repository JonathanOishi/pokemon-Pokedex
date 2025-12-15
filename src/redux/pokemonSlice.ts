import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

interface PokemonState {
    searchQuery: string;
    selectedType: string;
    cachedPokemons: Pokemon[];
    isLoading: boolean;
}

const initialState: PokemonState = {
    searchQuery: '',
    selectedType: 'ALL',
    cachedPokemons: [],
    isLoading: false,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<string>) => {
            state.selectedType = action.payload;
        },
        setCachedPokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.cachedPokemons = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearFilters: (state) => {
            state.searchQuery = '';
            state.selectedType = 'ALL';
        },
    },
});

export const {
    setSearchQuery,
    setSelectedType,
    setCachedPokemons,
    setLoading,
    clearFilters,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
