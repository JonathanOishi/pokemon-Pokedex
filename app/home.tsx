import React, { useMemo, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScrollView, ActivityIndicator } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { router } from 'expo-router';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import TypeFilter from '@/components/TypeFilter';
import HeartIcon from '@/components/icons/HeartIcon';
import { useGetPokemons, useGetPokemonsByType } from '@/src/graphql/hooks';
import { auth } from '@/src/services/firebase';
import { loadFavorites } from '@/src/services/favoritesStore';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { setFavorites } from '@/src/redux/favoritesSlice';
import { setSearchQuery, setSelectedType } from '@/src/redux/pokemonSlice';

export default function Home() {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.pokemon.searchQuery);
    const selectedType = useAppSelector((state) => state.pokemon.selectedType);

    const { loading: loadingAll, pokemons: allPokemons } = useGetPokemons(151, 0);
    const { loading: loadingByType, pokemons: pokemonsByType } = useGetPokemonsByType(
        selectedType,
        151
    );

    const apiPokemons = selectedType === 'ALL' ? allPokemons : pokemonsByType;
    const isLoading = selectedType === 'ALL' ? loadingAll : loadingByType;

    const filteredPokemons = useMemo(() => {
        if (!searchQuery) return apiPokemons;

        return apiPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [apiPokemons, searchQuery]);

    // Hydrate favorites from Firestore when user is logged in
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;
        (async () => {
            const items = await loadFavorites(user.uid);
            dispatch(setFavorites(items));
        })();
    }, []);

    return (
        <Box className="flex-1 bg-background-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Box className="px-4 pt-12 pb-4">
                    <HStack className="justify-between items-center mb-6">
                        <Text className="text-3xl font-bold text-typography-900">
                            Pokedex
                        </Text>
                        <HStack space="md">
                            <Pressable onPress={() => router.push('/settings')}>
                                <Text className="text-2xl">⚙️</Text>
                            </Pressable>
                            <Pressable onPress={() => router.push('/favorites')}>
                                <HeartIcon size={28} color="#e11d48" />
                            </Pressable>
                        </HStack>
                    </HStack>

                    <SearchBar
                        value={searchQuery}
                        onChangeText={(text) => dispatch(setSearchQuery(text))}
                    />

                    <TypeFilter
                        selectedType={selectedType}
                        onSelectType={(type) => dispatch(setSelectedType(type))}
                    />
                </Box>

                <Box className="px-4 pb-6">
                    {isLoading ? (
                        <Box className="flex-1 items-center justify-center py-10">
                            <ActivityIndicator size="large" color="#6366f1" />
                            <Text className="mt-4 text-typography-500">Loading Pokémons...</Text>
                        </Box>
                    ) : filteredPokemons.length === 0 ? (
                        <Box className="flex-1 items-center justify-center py-10">
                            <Text className="text-typography-500 text-lg">No Pokémons found</Text>
                        </Box>
                    ) : (
                        <Box className="flex-row flex-wrap justify-between">
                            {filteredPokemons.map((pokemon) => (
                                <PokemonCard
                                    key={pokemon.id}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    types={pokemon.types}
                                    onPress={() => router.push(`/pokemon/${pokemon.id}`)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </ScrollView>
        </Box>
    );
}
