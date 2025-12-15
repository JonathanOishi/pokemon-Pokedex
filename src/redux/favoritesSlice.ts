import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritePokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

interface FavoritesState {
    items: FavoritePokemon[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<FavoritePokemon>) => {
            if (!state.items.some(p => p.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(p => p.id !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = [];
        },
        setFavorites: (state, action: PayloadAction<FavoritePokemon[]>) => {
            state.items = action.payload ?? [];
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
