import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { ScrollView } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { router } from 'expo-router';
import PushNotificationTester from '@/components/PushNotificationTester';
// import CodePushChecker from '@/components/CodePushChecker'; // Desabilitado para Expo Go

export default function SettingsScreen() {
    return (
        <Box className="flex-1 bg-background-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Box className="px-4 pt-12 pb-4">
                    <HStack className="justify-between items-center mb-6">
                        <Text className="text-3xl font-bold text-typography-900">
                            ⚙️ Configurações
                        </Text>
                        <Pressable onPress={() => router.back()}>
                            <Text className="text-2xl">←</Text>
                        </Pressable>
                    </HStack>

                    <VStack space="lg">
                        <Box>
                            <Text className="text-xl font-semibold text-typography-900 mb-3">
                                Notificações Push
                            </Text>
                            <PushNotificationTester />
                        </Box>

                        {/* CodePush desabilitado para Expo Go */}
                        {/* <Box>
                            <Text className="text-xl font-semibold text-typography-900 mb-3">
                                CodePush Updates
                            </Text>
                            <CodePushChecker />
                        </Box> */}

                        <Box className="p-4 bg-background-0 rounded-lg border border-outline-200">
                            <Text className="text-sm text-typography-600">
                                Versão: 1.0.0
                            </Text>
                            <Text className="text-xs text-typography-500 mt-1">
                                Pokémon Pokédex App © 2025
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
}
