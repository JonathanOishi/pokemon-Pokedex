import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, RootState } from '../src/redux/store';
import { addFavorite, removeFavorite, setFavorites, FavoritePokemon } from '../src/redux/favoritesSlice';
import { auth } from '@/src/services/firebase';
import { saveFavorites, loadFavorites } from '@/src/services/favoritesStore';
import { onAuthStateChanged } from 'firebase/auth';

export const useFavorites = () => {
    const selectFavoriteItems = (state: RootState) => (state.favorites as { items: FavoritePokemon[] }).items;
    const favorites = useAppSelector(selectFavoriteItems);
    const dispatch = useAppDispatch();

    // Carregar favoritos quando o usuário logar
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const savedFavorites = await loadFavorites(user.uid);
                    dispatch(setFavorites(savedFavorites));
                } catch (error) {
                    console.error('Erro ao carregar favoritos:', error);
                }
            } else {
                dispatch(setFavorites([]));
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    const add = async (pokemon: FavoritePokemon) => {
        dispatch(addFavorite(pokemon));
        const user = auth.currentUser;
        if (user) {
            // Adiciona ao array e salva
            const updatedFavorites = [...favorites, pokemon];
            await saveFavorites(user.uid, updatedFavorites);
        }
    };

    const remove = async (id: number) => {
        dispatch(removeFavorite(id));
        const user = auth.currentUser;
        if (user) {
            // Remove do array e salva
            const updatedFavorites = favorites.filter((p: any) => p.id !== id);
            await saveFavorites(user.uid, updatedFavorites);
        }
    };

    const isFavorite = (id: number) => favorites.some((p: FavoritePokemon) => p.id === id);

    return { favorites, addFavorite: add, removeFavorite: remove, isFavorite };
};

