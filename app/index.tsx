import React, { useState, useMemo, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScrollView, ActivityIndicator } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import TypeFilter from '@/components/TypeFilter';
import MenuIcon from '@/components/icons/MenuIcon';
import { useGetPokemons, useGetPokemonsByType } from '@/graphql/hooks';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  // Buscar Pokémons da API
  const { loading: loadingAll, pokemons: allPokemons } = useGetPokemons(50, 0);
  const { loading: loadingByType, pokemons: pokemonsByType } = useGetPokemonsByType(
    selectedType,
    50
  );

  // Decidir qual lista usar
  const apiPokemons = selectedType === 'ALL' ? allPokemons : pokemonsByType;
  const isLoading = selectedType === 'ALL' ? loadingAll : loadingByType;

  // Filtrar por busca
  const filteredPokemons = useMemo(() => {
    if (!searchQuery) return apiPokemons;

    return apiPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apiPokemons, searchQuery]);

  return (
    <Box className="flex-1 bg-background-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box className="px-4 pt-12 pb-4">
          <HStack className="justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-typography-900">
              Pokedex
            </Text>
            <Pressable>
              <MenuIcon size={24} color="#1f2937" />
            </Pressable>
          </HStack>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Type Filter */}
          <TypeFilter
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </Box>

        {/* Pokemon Grid */}
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
                  onPress={() => console.log(`Pressed ${pokemon.name}`)}
                />
              ))}
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
