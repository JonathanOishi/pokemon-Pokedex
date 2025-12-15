import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {
    registerForPushNotificationsAsync,
    addNotificationReceivedListener,
    addNotificationResponseReceivedListener,
} from '../services/pushNotifications';
import { useAppDispatch } from '../redux/store';
import { addNotification as addUINotification } from '../redux/uiSlice';
import { router } from 'expo-router';

export function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState<string>();
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => {
                setExpoPushToken(token);
                if (token) {
                    console.log('Expo Push Token:', token);
                }
            })
            .catch((error) => {
                console.error('Erro ao registrar push notifications:', error);
            });

        notificationListener.current = addNotificationReceivedListener((notification) => {
            setNotification(notification);
            dispatch(
                addUINotification({
                    message: notification.request.content.body || 'Nova notificação',
                    type: 'info',
                })
            );
        });

        responseListener.current = addNotificationResponseReceivedListener((response) => {
            const data = response.notification.request.content.data;
            if (data?.screen) {
                router.push(data.screen as any);
            }
        });

        return () => {
            if (notificationListener.current) {
                notificationListener.current.remove();
            }
            if (responseListener.current) {
                responseListener.current.remove();
            }
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
}
