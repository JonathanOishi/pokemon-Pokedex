import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { router } from 'expo-router';
import PokemonCard from '@/components/PokemonCard';
import { useFavorites } from '@/components/FavoritesContext';

export default function FavoritesScreen() {
    const { favorites } = useFavorites();
    return (
        <Box className="flex-1 bg-background-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Box className="px-4 pt-12 pb-4">
                    <HStack className="justify-between items-center mb-6">
                        <Text className="text-3xl font-bold text-typography-900">
                            Favoritos
                        </Text>
                        <Pressable onPress={() => router.back()}>
                            <Text className="text-2xl">←</Text>
                        </Pressable>
                    </HStack>
                </Box>
                <Box className="px-4 pb-6">
                    {favorites.length === 0 ? (
                        <Text className="text-typography-500 text-lg text-center mt-10">
                            Nenhum Pokémon favoritado ainda.
                        </Text>
                    ) : (
                        <Box className="flex-row flex-wrap justify-between">
                            {favorites.map((pokemon) => (
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
