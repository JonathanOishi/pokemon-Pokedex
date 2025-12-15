import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useAppDispatch } from '@/src/redux/store';
import { addNotification } from '@/src/redux/uiSlice';

export function useNotificationHandler() {
    const dispatch = useAppDispatch();
    const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
    const responseListener = useRef<Notifications.Subscription | undefined>(undefined);

    useEffect(() => {
        // Listener para quando a notificação chega (app em foreground)
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('📬 Notificação recebida:', notification);

            // Mostra um toast interno quando a notificação chega
            dispatch(addNotification({
                message: notification.request.content.title || 'Nova notificação',
                type: 'info',
            }));
        });

        // Listener para quando o usuário TOCA na notificação
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('👆 Usuário tocou na notificação:', response);

            const data = response.notification.request.content.data;

            // Navega baseado nos dados da notificação
            handleNotificationNavigation(data);
        });

        // Verifica se o app foi aberto através de uma notificação
        Notifications.getLastNotificationResponseAsync().then(response => {
            if (response) {
                console.log('🚀 App aberto por notificação:', response);
                const data = response.notification.request.content.data;
                handleNotificationNavigation(data);
            }
        });

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, [dispatch]);

    const handleNotificationNavigation = (data: any) => {
        if (!data) return;

        console.log('🧭 Navegando para:', data);

        try {
            // Navega baseado no campo 'screen' nos dados
            if (data.screen === 'home') {
                router.push('/home');
            } else if (data.screen === 'favorites') {
                router.push('/favorites');
            } else if (data.screen === 'settings') {
                router.push('/settings');
            } else if (data.screen === 'pokemon' && data.pokemonId) {
                router.push(`/pokemon/${data.pokemonId}`);
            } else if (data.pokemonId) {
                // Se só tiver pokemonId, vai direto para o detalhe
                router.push(`/pokemon/${data.pokemonId}`);
            } else {
                // Se não tiver navegação específica, vai para home
                router.push('/home');
            }

            // Mostra feedback ao usuário
            dispatch(addNotification({
                message: 'Navegação realizada com sucesso!',
                type: 'success',
            }));
        } catch (error) {
            console.error('❌ Erro ao navegar:', error);
            dispatch(addNotification({
                message: 'Erro ao processar notificação',
                type: 'error',
            }));
        }
    };

    return null;
}
