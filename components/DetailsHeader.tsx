import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';

interface DetailsHeaderProps {
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function DetailsHeader({ isFavorite, onToggleFavorite }: DetailsHeaderProps) {
    return (
        <HStack className="px-6 pt-14 pb-4 items-center justify-between">
            <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                accessibilityLabel="Voltar"
            >
                <Text className="text-white text-2xl font-bold">←</Text>
            </Pressable>
            <Pressable
                onPress={onToggleFavorite}
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                accessibilityLabel="Favoritar"
            >
                <Text className="text-white text-2xl">
                    {isFavorite ? '❤️' : '🤍'}
                </Text>
            </Pressable>
        </HStack>
    );
}
