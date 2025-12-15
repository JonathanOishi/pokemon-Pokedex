import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import {
    sendLocalNotification,
    scheduleNotification,
    AppNotifications,
    clearBadgeCount,
} from '@/src/services/pushNotifications';
import { useAppDispatch } from '@/src/redux/store';
import { addNotification } from '@/src/redux/uiSlice';

export default function PushNotificationTester() {
    const [title, setTitle] = useState('Teste de Notificação');
    const [body, setBody] = useState('Esta é uma notificação de teste!');
    const [seconds, setSeconds] = useState('5');
    const dispatch = useAppDispatch();

    const handleSendImmediate = async () => {
        await sendLocalNotification({
            title,
            body,
            data: { screen: 'home' },
        });
        dispatch(
            addNotification({
                message: 'Notificação enviada!',
                type: 'success',
            })
        );
    };

    const handleSchedule = async () => {
        const sec = parseInt(seconds) || 5;
        await scheduleNotification(
            {
                title,
                body,
                data: { screen: 'home' },
            },
            sec
        );
        dispatch(
            addNotification({
                message: `Notificação agendada para ${sec}s`,
                type: 'info',
            })
        );
    };

    const handleTestNotifications = () => {
        // Testar diferentes tipos de notificações com navegação
        AppNotifications.welcomeBack();
        setTimeout(() => AppNotifications.pokemonCaught('Pikachu', 25), 2000);
        setTimeout(() => AppNotifications.pokemonDetail('Charizard', 6), 4000);
        setTimeout(() => AppNotifications.newUpdate(), 6000);
    };

    const handleClearBadge = async () => {
        await clearBadgeCount();
        dispatch(
            addNotification({
                message: 'Badge limpo!',
                type: 'success',
            })
        );
    };

    return (
        <Box className="p-4 bg-background-0 rounded-lg border border-outline-200">
            <VStack space="md">
                <Text className="text-lg font-semibold text-typography-900">
                    🔔 Testador de Push Notifications
                </Text>

                <VStack space="sm">
                    <Text className="text-sm font-medium text-typography-700">Título:</Text>
                    <Input>
                        <InputField
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Título da notificação"
                        />
                    </Input>
                </VStack>

                <VStack space="sm">
                    <Text className="text-sm font-medium text-typography-700">Mensagem:</Text>
                    <Input>
                        <InputField
                            value={body}
                            onChangeText={setBody}
                            placeholder="Corpo da notificação"
                            multiline
                        />
                    </Input>
                </VStack>

                <HStack space="sm">
                    <Button onPress={handleSendImmediate} className="flex-1 bg-blue-500">
                        <ButtonText>Enviar Agora</ButtonText>
                    </Button>
                </HStack>

                <VStack space="sm">
                    <HStack space="sm" className="items-center">
                        <Text className="text-sm font-medium text-typography-700">
                            Agendar em:
                        </Text>
                        <Box className="flex-1">
                            <Input>
                                <InputField
                                    value={seconds}
                                    onChangeText={setSeconds}
                                    placeholder="5"
                                    keyboardType="numeric"
                                />
                            </Input>
                        </Box>
                        <Text className="text-sm text-typography-600">segundos</Text>
                    </HStack>
                    <Button onPress={handleSchedule} className="bg-purple-500">
                        <ButtonText>Agendar Notificação</ButtonText>
                    </Button>
                </VStack>

                <Box className="h-px bg-outline-200 my-2" />

                <Text className="text-sm font-semibold text-typography-800">
                    Notificações Pré-definidas:
                </Text>

                <Button onPress={handleTestNotifications} className="bg-green-500">
                    <ButtonText>Testar Todas (4 notificações)</ButtonText>
                </Button>

                <Button
                    onPress={() => {
                        sendLocalNotification({
                            title: '🔍 Toque para ver Pikachu!',
                            body: 'Esta notificação te levará ao Pikachu',
                            data: { screen: 'pokemon', pokemonId: 25 },
                        });
                        dispatch(addNotification({
                            message: 'Notificação com navegação enviada!',
                            type: 'info',
                        }));
                    }}
                    className="bg-yellow-500"
                >
                    <ButtonText>Testar Navegação (Pikachu)</ButtonText>
                </Button>

                <Button onPress={handleClearBadge} className="bg-gray-500">
                    <ButtonText>Limpar Badge (Contador)</ButtonText>
                </Button>

                <Box className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Text className="text-xs text-blue-800">
                        👆 <Text className="font-semibold">Toque nas Notificações:</Text> Todas as notificações
                        possuem navegação! Toque nelas para ir à tela correspondente.
                    </Text>
                </Box>

                <Box className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Text className="text-xs text-yellow-800">
                        💡 <Text className="font-semibold">Dica:</Text> As notificações só aparecem
                        quando o app está em background ou fechado. No foreground, elas aparecem como
                        toast no topo.
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}
