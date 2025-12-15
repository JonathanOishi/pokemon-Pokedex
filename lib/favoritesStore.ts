import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { FavoritePokemon } from '@/slices/favoritesSlice';

const collectionName = 'favorites';

export async function loadFavorites(userId: string): Promise<FavoritePokemon[]> {
    const ref = doc(db, collectionName, userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
        const data = snap.data();
        return (data.items ?? []) as FavoritePokemon[];
    }
    return [];
}

export async function saveFavorites(userId: string, items: FavoritePokemon[]): Promise<void> {
    const ref = doc(db, collectionName, userId);
    await setDoc(ref, { items }, { merge: true });
}
