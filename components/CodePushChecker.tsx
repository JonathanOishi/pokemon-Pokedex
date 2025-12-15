import React, { useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { ActivityIndicator } from 'react-native';
import codePush from 'react-native-code-push';
import { useAppDispatch } from '@/src/redux/store';
import { addNotification } from '@/src/redux/uiSlice';

interface CodePushStatus {
    status: string;
    progress?: {
        receivedBytes: number;
        totalBytes: number;
    };
}

export default function CodePushChecker() {
    const [checking, setChecking] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [updateInfo, setUpdateInfo] = useState<any>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const dispatch = useAppDispatch();

    const checkForUpdate = async () => {
        setChecking(true);
        setStatusMessage('Verificando atualizações...');

        try {
            const update = await codePush.checkForUpdate();
            if (update) {
                setUpdateInfo(update);
                setStatusMessage(`Atualização disponível: v${update.label}`);
                dispatch(addNotification({
                    message: 'Nova atualização disponível!',
                    type: 'info',
                }));
            } else {
                setStatusMessage('Aplicativo está atualizado!');
                dispatch(addNotification({
                    message: 'App já está na última versão',
                    type: 'success',
                }));
            }
        } catch (error) {
            setStatusMessage('Erro ao verificar atualização');
            dispatch(addNotification({
                message: 'Erro ao verificar atualização',
                type: 'error',
            }));
        } finally {
            setChecking(false);
        }
    };

    const syncUpdate = async () => {
        setSyncing(true);
        setStatusMessage('Baixando atualização...');

        try {
            await codePush.sync(
                {
                    installMode: codePush.InstallMode.IMMEDIATE,
                    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                },
                (status) => {
                    switch (status) {
                        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                            setStatusMessage('Verificando atualização...');
                            break;
                        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                            setStatusMessage('Baixando atualização...');
                            break;
                        case codePush.SyncStatus.INSTALLING_UPDATE:
                            setStatusMessage('Instalando atualização...');
                            break;
                        case codePush.SyncStatus.UP_TO_DATE:
                            setStatusMessage('Aplicativo atualizado!');
                            break;
                        case codePush.SyncStatus.UPDATE_INSTALLED:
                            setStatusMessage('Atualização instalada! Reiniciando...');
                            dispatch(addNotification({
                                message: 'Atualização concluída!',
                                type: 'success',
                            }));
                            break;
                    }
                },
                (progress) => {
                    const percent = Math.round((progress.receivedBytes / progress.totalBytes) * 100);
                    setStatusMessage(`Baixando: ${percent}%`);
                }
            );
        } catch (error) {
            setStatusMessage('Erro ao instalar atualização');
            dispatch(addNotification({
                message: 'Erro ao instalar atualização',
                type: 'error',
            }));
        } finally {
            setSyncing(false);
        }
    };

    return (
        <Box className="p-4 bg-background-0 rounded-lg border border-outline-200">
            <VStack space="md">
                <Text className="text-lg font-semibold text-typography-900">
                    CodePush Updates
                </Text>

                {statusMessage && (
                    <Text className="text-sm text-typography-600">
                        {statusMessage}
                    </Text>
                )}

                {(checking || syncing) && (
                    <Box className="items-center py-2">
                        <ActivityIndicator size="small" color="#6366f1" />
                    </Box>
                )}

                <Button
                    onPress={checkForUpdate}
                    disabled={checking || syncing}
                    className="bg-blue-500"
                >
                    <ButtonText>
                        {checking ? 'Verificando...' : 'Verificar Atualização'}
                    </ButtonText>
                </Button>

                {updateInfo && (
                    <Button
                        onPress={syncUpdate}
                        disabled={checking || syncing}
                        className="bg-green-500"
                    >
                        <ButtonText>
                            {syncing ? 'Instalando...' : 'Instalar Atualização'}
                        </ButtonText>
                    </Button>
                )}
            </VStack>
        </Box>
    );
}
