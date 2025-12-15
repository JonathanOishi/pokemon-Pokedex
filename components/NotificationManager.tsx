import React, { useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useAppSelector, useAppDispatch } from '@/src/redux/store';
import { removeNotification } from '@/src/redux/uiSlice';

export default function NotificationManager() {
    const notifications = useAppSelector((state) => state.ui.notifications);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (notifications.length === 0) return;

        // Auto remove notifications after 5 seconds
        const timers = notifications.map((notification) => {
            return setTimeout(() => {
                dispatch(removeNotification(notification.id));
            }, 5000);
        });

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [notifications]);

    if (notifications.length === 0) return null;

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <Box className="absolute top-12 left-0 right-0 z-50 px-4">
            {notifications.map((notification) => (
                <Box
                    key={notification.id}
                    className={`${getNotificationColor(
                        notification.type
                    )} rounded-lg p-4 mb-2 shadow-lg`}
                >
                    <Text className="text-white font-medium">
                        {notification.message}
                    </Text>
                </Box>
            ))}
        </Box>
    );
}
