import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import authReducer from './authSlice';
import pokemonReducer from './pokemonSlice';
import uiReducer from './uiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authReducer,
        pokemon: pokemonReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
