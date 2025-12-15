// DESABILITADO PARA EXPO GO - Estes módulos nativos não funcionam no Expo Go
// import Analytics from 'appcenter-analytics';
// import Crashes from 'appcenter-crashes';
import { Platform } from 'react-native';

// App Secret do AppCenter
const APP_SECRET_ANDROID = 'f23d6114-d92a-474c-b32f-a7aff8d0153e';
const APP_SECRET_IOS = 'YOUR_IOS_APP_SECRET_HERE'; // Adicione quando criar o app iOS

// Configuração do AppCenter (MOCK para Expo Go)
export const initializeAppCenter = async () => {
    try {
        console.log('⚠️ AppCenter está desabilitado no Expo Go');
        console.log('💡 Para usar AppCenter, crie um development build com: npx expo run:android');
        // // Inicializar Analytics
        // await Analytics.setEnabled(true);
        // const analyticsEnabled = await Analytics.isEnabled();
        // console.log('📊 AppCenter Analytics:', analyticsEnabled ? 'Enabled' : 'Disabled');

        // // Inicializar Crashes
        // await Crashes.setEnabled(true);
        // const crashesEnabled = await Crashes.isEnabled();
        // console.log('💥 AppCenter Crashes:', crashesEnabled ? 'Enabled' : 'Disabled');

        // // Verificar se houve crashes na sessão anterior
        // const didCrash = await Crashes.hasCrashedInLastSession();
        // if (didCrash) {
        //     console.log('⚠️ App teve crash na última sessão');
        //     const crashReport = await Crashes.lastSessionCrashReport();
        //     console.log('Crash Report:', crashReport);
        // }

        // console.log('✅ AppCenter inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar AppCenter:', error);
    }
};

// Helper para rastrear eventos customizados (MOCK para Expo Go)
export const trackEvent = (eventName: string, properties?: { [key: string]: string }) => {
    // Analytics.trackEvent(eventName, properties);
    console.log(`📊 Event tracked (mock): ${eventName}`, properties);
};

// Helper para gerar erro de teste (apenas para desenvolvimento)
export const generateTestCrash = () => {
    if (__DEV__) {
        console.log('💣 Test crash desabilitado no Expo Go');
        // Crashes.generateTestCrash();
    }
};

// Eventos comuns do app
export const AppCenterEvents = {
    // Autenticação
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAILED: 'login_failed',
    LOGOUT: 'logout',

    // Pokémon
    POKEMON_VIEWED: 'pokemon_viewed',
    POKEMON_FAVORITED: 'pokemon_favorited',
    POKEMON_UNFAVORITED: 'pokemon_unfavorited',
    POKEMON_SEARCHED: 'pokemon_searched',

    // Filtros
    TYPE_FILTER_APPLIED: 'type_filter_applied',
    SEARCH_PERFORMED: 'search_performed',

    // CodePush
    CODEPUSH_UPDATE_INSTALLED: 'codepush_update_installed',
    CODEPUSH_UPDATE_FAILED: 'codepush_update_failed',

    // Navegação
    SCREEN_VIEWED: 'screen_viewed',
};

// export { Analytics, Crashes }; // Desabilitado para Expo Go
