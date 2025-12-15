import React from 'react';
import { useFavorites } from '@/components/FavoritesContext';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { ScrollView, ActivityIndicator } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useGetPokemonDetails } from '@/graphql/hooks';
import { getPokemonImageUrl } from '@/graphql/types';
import DetailsHeader from '@/components/DetailsHeader';


const typeColors: { [key: string]: string } = {
    grass: '#78C850',
    poison: '#A040A0',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    flying: '#A890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
};

const statColors: { [key: string]: string } = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    speed: '#FA92B2',
};

const statAbbreviations: { [key: string]: string } = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD',
};

export default function PokemonDetails() {
    const { id } = useLocalSearchParams();
    const pokemonId = parseInt(id as string);
    const { loading, error, pokemon } = useGetPokemonDetails(pokemonId);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(pokemonId);
    const handleToggleFavorite = () => {
        if (!pokemon) return;
        if (favorite) {
            removeFavorite(pokemon.id);
        } else {
            const types = pokemon.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name.toUpperCase());
            addFavorite({
                id: pokemon.id,
                name: pokemon.name,
                image: getPokemonImageUrl(pokemon),
                types,
            });
        }
    };

    if (loading) {
        return (
            <Box className="flex-1 bg-background-0 items-center justify-center">
                <ActivityIndicator size="large" color="#3b82f6" />
            </Box>
        );
    }

    if (error || !pokemon) {
        return (
            <Box className="flex-1 bg-background-0 items-center justify-center p-4">
                <Text className="text-typography-500 text-center">
                    Erro ao carregar detalhes do Pokémon
                </Text>
            </Box>
        );
    }

    // Corrige erro de JSON.parse: só faz parse se for string válida
    let sprites: any = {};
    const spritesRaw = pokemon.pokemon_v2_pokemonsprites[0]?.sprites;
    if (typeof spritesRaw === 'string') {
        try {
            sprites = JSON.parse(spritesRaw);
        } catch {
            sprites = {};
        }
    }
    const imageUrl = getPokemonImageUrl(pokemon);

    const types = pokemon.pokemon_v2_pokemontypes.map(
        (t: any) => t.pokemon_v2_type.name
    );

    const abilities = pokemon.pokemon_v2_pokemonabilities?.map(
        (a: any) => a.pokemon_v2_ability.name
    ) || [];

    const stats = pokemon.pokemon_v2_pokemonstats?.map((s: any) => ({
        name: s.pokemon_v2_stat.name,
        value: s.base_stat,
    })) || [];

    const totalStats = stats.reduce((sum: number, stat: any) => sum + stat.value, 0);

    const description =
        pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0]
            ?.flavor_text || 'No description available.';

    const formatId = (num: number) => `#${num.toString().padStart(3, '0')}`;

    // Cor de fundo baseada no primeiro tipo
    const backgroundColor = typeColors[types[0]] || '#A8A878';

    return (
        <Box className="flex-1" style={{ backgroundColor }}>
            <ScrollView className="flex-1">
                {/* Header padrão */}
                <DetailsHeader isFavorite={favorite} onToggleFavorite={handleToggleFavorite} />

                {/* Imagem do Pokémon */}
                <Box className="items-center justify-center py-8 px-6">
                    {typeof imageUrl === 'string' && imageUrl.length > 0 ? (
                        <Image
                            source={{ uri: imageUrl }}
                            alt={pokemon.name}
                            className="w-72 h-72"
                            resizeMode="contain"
                        />
                    ) : (
                        <Box className="w-72 h-72 items-center justify-center bg-gray-100 rounded-3xl">
                            <Text className="text-gray-400">Imagem não disponível</Text>
                        </Box>
                    )}
                </Box>

                {/* Card branco com informações */}
                <Box className="bg-white rounded-t-[40px] pt-8 pb-12 px-6 mt-4">
                    {/* Nome e ID */}
                    <HStack className="items-center justify-between mb-4">
                        <Text className="text-gray-900 font-bold text-4xl capitalize">
                            {pokemon.name}
                        </Text>
                        <Text className="text-gray-400 font-bold text-xl">
                            {formatId(pokemon.id)}
                        </Text>
                    </HStack>

                    {/* Tipos */}
                    <HStack className="gap-3 mb-6">
                        {types.map((type: string) => (
                            <Box
                                key={type}
                                className="px-5 py-2 rounded-full flex-row items-center gap-2"
                                style={{ backgroundColor: typeColors[type] || '#A8A878' }}
                            >
                                <Text className="text-white font-semibold text-sm capitalize">
                                    🔥 {type}
                                </Text>
                            </Box>
                        ))}
                    </HStack>

                    {/* Descrição */}
                    <Text className="text-gray-600 text-base leading-6 mb-6">
                        {description.replace(/\f/g, ' ').replace(/\n/g, ' ')}
                    </Text>

                    {/* Info Cards */}
                    <HStack className="gap-3 mb-8">
                        <Box className="flex-1 bg-gray-50 rounded-2xl p-4">
                            <Text className="text-gray-500 text-xs font-medium mb-1 uppercase">
                                Weight
                            </Text>
                            <Text className="text-gray-900 font-bold text-lg">
                                ⚖️ {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '0.0'} kg
                            </Text>
                        </Box>
                        <Box className="flex-1 bg-gray-50 rounded-2xl p-4">
                            <Text className="text-gray-500 text-xs font-medium mb-1 uppercase">
                                Height
                            </Text>
                            <Text className="text-gray-900 font-bold text-lg">
                                📏 {pokemon.height ? (pokemon.height / 10).toFixed(1) : '0.0'} m
                            </Text>
                        </Box>
                        <Box className="flex-1 bg-gray-50 rounded-2xl p-4">
                            <Text className="text-gray-500 text-xs font-medium mb-1 uppercase">
                                Ability
                            </Text>
                            <Text className="text-gray-900 font-bold text-base capitalize">
                                ⚡ {abilities[0]?.replace('-', ' ') || 'None'}
                            </Text>
                        </Box>
                    </HStack>

                    {/* Base Stats */}
                    <Text className="text-gray-900 font-bold text-2xl mb-4">
                        Base Stats
                    </Text>
                    <VStack className="gap-3 mb-4">
                        {stats.map((stat: any) => {
                            const statColor = statColors[stat.name] || '#6B7280';
                            return (
                                <HStack key={stat.name} className="items-center gap-3">
                                    <Text className="text-gray-600 font-medium text-sm w-12 uppercase">
                                        {statAbbreviations[stat.name] || stat.name}
                                    </Text>
                                    <Text className="text-gray-900 font-bold text-base w-12 text-right">
                                        {stat.value}
                                    </Text>
                                    <Box className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <Box
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${(stat.value / 255) * 100}%`,
                                                backgroundColor: statColor,
                                            }}
                                        />
                                    </Box>
                                </HStack>
                            );
                        })}
                    </VStack>

                    {/* Total Stats */}
                    <HStack className="items-center gap-3 pt-3 border-t border-gray-200">
                        <Text className="text-gray-600 font-medium text-sm w-12 uppercase">
                            TOT
                        </Text>
                        <Text className="text-gray-900 font-bold text-base w-12 text-right">
                            {totalStats}
                        </Text>
                        <Text className="flex-1 text-gray-400 text-sm italic">
                            Total Base Stats
                        </Text>
                    </HStack>
                </Box>
            </ScrollView>
        </Box>
    );
}
