import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ReduxProvider } from '../src/redux/ReduxProvider';
import '@/global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { Slot, usePathname, useRootNavigationState, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/src/services/apolloClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotificationManager from '@/components/NotificationManager';
import { auth } from '@/src/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '@/src/redux/store';
import { setUser, logout } from '@/src/redux/authSlice';
import { setTheme } from '@/src/redux/uiSlice';
import { initializeAppCenter } from '@/src/services/appCenter';
import { usePushNotifications } from '@/src/hooks/usePushNotifications';
import { useNotificationHandler } from '@/src/hooks/useNotificationHandler';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ApolloProvider client={apolloClient}>
          <RootLayoutNav />
        </ApolloProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const navState = useRootNavigationState();
  const dispatch = useAppDispatch();
  const { expoPushToken } = usePushNotifications();

  // Hook para gerenciar eventos de toque em notificações
  useNotificationHandler();

  useEffect(() => {
    initializeAppCenter();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTheme(colorMode === 'dark' ? 'dark' : 'light'));
  }, [colorMode, dispatch]);

  useEffect(() => {
    if (!navState?.key) return;

    const timer = setTimeout(() => {
      if (pathname === '/') {
        router.replace('/login');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [navState?.key, pathname]);

  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
        <NotificationManager />
        <Slot />
        {pathname === '/' && (
          <Fab
            onPress={() =>
              setColorMode(colorMode === 'dark' ? 'light' : 'dark')
            }
            className="m-6"
            size="lg"
          >
            <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
          </Fab>
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
