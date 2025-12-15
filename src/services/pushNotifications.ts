import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export interface PushNotificationData {
    title: string;
    body: string;
    data?: { [key: string]: any };
    sound?: boolean;
    badge?: number;
}

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;

    if (!Device.isDevice) {
        console.warn('Push notifications só funcionam em dispositivos físicos');
        return;
    }

    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.warn('Permissão para notificações negada');
            return;
        }

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                sound: 'default',
            });
        }

        return token;
    } catch (error) {
        console.error('Erro ao registrar push notifications:', error);
    }
}

export async function sendLocalNotification(notification: PushNotificationData) {
    try {
        const content: any = {
            title: notification.title,
            body: notification.body,
            data: notification.data,
            sound: notification.sound !== false,
        };

        // Só adiciona badge se for um número válido
        if (typeof notification.badge === 'number') {
            content.badge = notification.badge;
        }

        await Notifications.scheduleNotificationAsync({
            content,
            trigger: null,
        });
    } catch (error) {
        console.error('Erro ao enviar notificação local:', error);
    }
}

export async function scheduleNotification(notification: PushNotificationData, seconds: number) {
    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: notification.title,
                body: notification.body,
                data: notification.data,
                sound: notification.sound !== false,
            },
            trigger: {
                seconds,
            } as any,
        });
        return id;
    } catch (error) {
        console.error('Erro ao agendar notificação:', error);
    }
}

export async function cancelNotification(notificationId: string) {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
        console.error('Erro ao cancelar notificação:', error);
    }
}

export async function cancelAllNotifications() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
        console.error('Erro ao cancelar notificações:', error);
    }
}

export async function clearBadgeCount() {
    try {
        await Notifications.setBadgeCountAsync(0);
    } catch (error) {
        console.error('Erro ao limpar badge:', error);
    }
}

export async function setBadgeCount(count: number) {
    try {
        await Notifications.setBadgeCountAsync(count);
    } catch (error) {
        console.error('Erro ao atualizar badge:', error);
    }
}

export function addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
) {
    return Notifications.addNotificationReceivedListener(callback);
}

export function addNotificationResponseReceivedListener(
    callback: (response: Notifications.NotificationResponse) => void
) {
    return Notifications.addNotificationResponseReceivedListener(callback);
}

// Notificações pré-definidas do app
export const AppNotifications = {
    welcomeBack: () =>
        sendLocalNotification({
            title: '👋 Bem-vindo de volta, Treinador!',
            body: 'Novos Pokémons te aguardam!',
            data: { screen: 'home' },
        }),

    pokemonCaught: (pokemonName: string, pokemonId?: number) =>
        sendLocalNotification({
            title: '🎉 Pokémon Capturado!',
            body: `Você adicionou ${pokemonName} aos seus favoritos!`,
            data: { screen: 'favorites', pokemon: pokemonName, pokemonId },
        }),

    pokemonDetail: (pokemonName: string, pokemonId: number) =>
        sendLocalNotification({
            title: `📱 Veja mais sobre ${pokemonName}!`,
            body: 'Toque para ver os detalhes deste Pokémon!',
            data: { screen: 'pokemon', pokemonId },
        }),

    dailyReminder: () =>
        scheduleNotification(
            {
                title: '🔥 Não esqueça de jogar hoje!',
                body: 'Capture mais Pokémons e complete sua Pokédex!',
                data: { screen: 'home' },
            },
            86400 // 24 horas
        ),

    newUpdate: () =>
        sendLocalNotification({
            title: '🚀 Nova Atualização Disponível!',
            body: 'Atualize seu app para ver as novidades!',
            data: { screen: 'settings' },
        }),
};

export default Notifications;
