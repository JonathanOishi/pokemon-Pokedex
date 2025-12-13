import React from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { ScrollView } from 'react-native';

interface TypeFilterProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

const pokemonTypes = [
    { name: 'All Gen', value: 'ALL' },
    { name: '🔥 Fire', value: 'FIRE' },
    { name: '💧 Water', value: 'WATER' },
    { name: '🌿 Grass', value: 'GRASS' },
    { name: '⚡ Electric', value: 'ELECTRIC' },
];

export default function TypeFilter({ selectedType, onSelectType }: TypeFilterProps) {
    return (
        <Box className="mb-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
            >
                {pokemonTypes.map((type) => (
                    <Button
                        key={type.value}
                        size="sm"
                        variant={selectedType === type.value ? 'solid' : 'outline'}
                        className={
                            selectedType === type.value
                                ? 'bg-typography-900 rounded-full px-4'
                                : 'bg-background-0 border-outline-200 rounded-full px-4'
                        }
                        onPress={() => onSelectType(type.value)}
                    >
                        <ButtonText
                            className={
                                selectedType === type.value
                                    ? 'text-white font-medium'
                                    : 'text-typography-700 font-medium'
                            }
                        >
                            {type.name}
                        </ButtonText>
                    </Button>
                ))}
            </ScrollView>
        </Box>
    );
}
