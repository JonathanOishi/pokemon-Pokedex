import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, Auth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase Web SDK configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
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
