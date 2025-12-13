import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';

interface PokemonCardProps {
    id: number;
    name: string;
    image: string;
    types: string[];
    onPress?: () => void;
}

const typeColors: { [key: string]: string } = {
    GRASS: 'bg-green-500',
    POISON: 'bg-purple-500',
    FIRE: 'bg-red-500',
    WATER: 'bg-blue-500',
    ELECTRIC: 'bg-yellow-500',
    FLYING: 'bg-indigo-400',
};

export default function PokemonCard({ id, name, image, types, onPress }: PokemonCardProps) {
    const formatId = (num: number) => `#${num.toString().padStart(3, '0')}`;

    return (
        <Pressable onPress={onPress} className="w-[48%] mb-4">
            <Box className="bg-background-0 rounded-2xl p-4 shadow-sm border border-outline-100">
                {/* Header com nome e ID */}
                <Box className="flex-row justify-between items-start mb-2">
                    <Text className="text-typography-900 font-semibold text-base capitalize">
                        {name}
                    </Text>
                    <Text className="text-typography-400 text-xs font-medium">
                        {formatId(id)}
                    </Text>
                </Box>

                {/* Badges de tipos */}
                <Box className="flex-row gap-1 mb-3">
                    {types.map((type) => (
                        <Badge
                            key={type}
                            size="sm"
                            variant="solid"
                            className={`${typeColors[type] || 'bg-gray-500'} rounded-full px-2`}
                        >
                            <BadgeText className="text-white text-xs font-medium uppercase">
                                {type}
                            </BadgeText>
                        </Badge>
                    ))}
                </Box>

                {/* Imagem do Pokemon */}
                <Box className="items-center justify-center bg-background-50 rounded-xl h-32">
                    <Image
                        source={{ uri: image }}
                        alt={name}
                        className="w-28 h-28"
                        resizeMode="contain"
                    />
                </Box>
            </Box>
        </Pressable>
    );
}
