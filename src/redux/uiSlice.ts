import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    theme: 'light' | 'dark' | 'system';
    showWelcomeModal: boolean;
    notifications: {
        id: string;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
        timestamp: number;
    }[];
}

const initialState: UiState = {
    theme: 'system',
    showWelcomeModal: true,
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload;
        },
        setShowWelcomeModal: (state, action: PayloadAction<boolean>) => {
            state.showWelcomeModal = action.payload;
        },
        addNotification: (
            state,
            action: PayloadAction<{
                message: string;
                type: 'success' | 'error' | 'info' | 'warning';
            }>
        ) => {
            const timestamp = Date.now();
            const uniqueId = `${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
            state.notifications.push({
                id: uniqueId,
                message: action.payload.message,
                type: action.payload.type,
                timestamp,
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
});

export const {
    setTheme,
    setShowWelcomeModal,
    addNotification,
    removeNotification,
    clearNotifications,
} = uiSlice.actions;
export default uiSlice.reducer;
