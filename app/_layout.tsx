import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ReduxProvider } from '../ReduxProvider';
import '@/global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { Slot, usePathname, useRootNavigationState, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apolloClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const navState = useRootNavigationState();

  // Ensure initial navigation only occurs after root navigator mounts
  useEffect(() => {
    if (!navState?.key) return;

    // Use setTimeout to ensure navigation happens after mount
    const timer = setTimeout(() => {
      if (pathname === '/') {
        router.replace('/login');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [navState?.key, pathname]);

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ApolloProvider client={apolloClient}>
          <GluestackUIProvider mode={colorMode}>
            <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
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
        </ApolloProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
