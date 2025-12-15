// DESABILITADO PARA EXPO GO - Este módulo nativo não funciona no Expo Go
// import codePush from 'react-native-code-push';

// Opções de configuração do CodePush (DESABILITADO)
export const codePushOptions = {
    // // Verifica atualizações ao iniciar o app
    // checkFrequency: codePush.CheckFrequency.ON_APP_START,

    // // Instala a atualização na próxima inicialização (mais seguro)
    // installMode: codePush.InstallMode.ON_NEXT_RESTART,

    // // Instala imediatamente se o app estiver em background
    // // installMode: codePush.InstallMode.IMMEDIATE,

    // // Tempo mínimo em background antes de instalar (10 segundos)
    // minimumBackgroundDuration: 10,

    // // Deployment keys (serão geradas no AppCenter)
    // deploymentKey: {
    //     ios: {
    //         // Staging: Para testes internos
    //         staging: process.env.CODEPUSH_IOS_STAGING_KEY || '',
    //         // Production: Para usuários finais
    //         production: process.env.CODEPUSH_IOS_PRODUCTION_KEY || '',
    //     },
    //     android: {
    //         // Staging: Para testes internos
    //         staging: process.env.CODEPUSH_ANDROID_STAGING_KEY || '',
    //         // Production: Para usuários finais
    //         production: process.env.CODEPUSH_ANDROID_PRODUCTION_KEY || '',
    //     },
    // },
};

// Helper para verificar atualizações manualmente (MOCK para Expo Go)
export const checkForCodePushUpdate = async () => {
    console.log('⚠️ CodePush desabilitado no Expo Go');
    return null;
    // try {
    //     const update = await codePush.checkForUpdate();
    //     if (update) {
    //         console.log('📦 CodePush: Atualização disponível!');
    //         return update;
    //     } else {
    //         console.log('✅ CodePush: App está atualizado!');
    //         return null;
    //     }
    // } catch (error) {
    //     console.error('❌ CodePush: Erro ao verificar atualização', error);
    //     return null;
    // }
};

// Helper para sincronizar atualizações (MOCK para Expo Go)
export const syncCodePushUpdate = async (onStatusChange?: (status: any) => void) => {
    console.log('⚠️ CodePush sync desabilitado no Expo Go');
    return null;
    // try {
    //     const status = await codePush.sync(
    //         {
    //             installMode: codePush.InstallMode.ON_NEXT_RESTART,
    //             mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
    //         },
    //         onStatusChange
    //     );
    //     return status;
    // } catch (error) {
    //     console.error('❌ CodePush: Erro ao sincronizar', error);
    //     return null;
    // }
};

// Hook para usar no componente (MOCK para Expo Go)
export const getCodePushMetadata = async () => {
    console.log('⚠️ CodePush metadata desabilitado no Expo Go');
    return null;
    // try {
    //     const metadata = await codePush.getUpdateMetadata();
    //     if (metadata) {
    //         console.log('📦 CodePush metadata:', {
    //             label: metadata.label,
    //             appVersion: metadata.appVersion,
    //             description: metadata.description,
    //         });
    //     }
    //     return metadata;
    // } catch (error) {
    //     console.error('❌ CodePush: Erro ao obter metadata', error);
    //     return null;
    // }
};

// Mock export para evitar erros
export default null;
