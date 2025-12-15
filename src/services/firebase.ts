import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, Auth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase Web SDK configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDd3lB9xMvK_DGh-r4OY05oZKRcuCojqMo',
    authDomain: 'pokemonpokedex-4602b.firebaseapp.com',
    projectId: 'pokemonpokedex-4602b',
    storageBucket: 'pokemonpokedex-4602b.firebasestorage.app',
    messagingSenderId: '924840001810',
    appId: '1:924840001810:web:4edf16a0dc69e67c51b3cb',
};

// Initialize only once and reuse the instance
export const firebaseApp: FirebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);

export default firebaseApp;

// Export Auth and Firestore singletons
// Use React Native persistence for Auth on native platforms
export const auth: Auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db: Firestore = getFirestore(firebaseApp);
