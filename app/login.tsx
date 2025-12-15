import React, { useMemo, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Image } from '@/components/ui/image';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { validateLogin } from '@/src/services/auth';
import { FavoritePokemon } from '@/src/redux/favoritesSlice';
import { useAppDispatch } from '@/src/redux/store';
import { setUser, setError, setLoading } from '@/src/redux/authSlice';
import { auth } from '@/src/services/firebase';
import { trackEvent, AppCenterEvents } from '@/src/services/appCenter';

export default function LoginScreen() {
    const dispatch = useAppDispatch();
    const randomPokemon = useMemo<FavoritePokemon>(() => {
        return {
            id: 25,
            name: 'Pikachu',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            types: ['ELECTRIC'],
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const next: { username?: string; password?: string } = {};
        if (!username || username.length < 3) next.username = 'Informe usuário/email válido';
        if (!password || password.length < 6) next.password = 'Senha deve ter ao menos 6 caracteres';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const onLogin = async () => {
        if (!validate()) return;

        setIsLoading(true);
        setErrors({});
        dispatch(setLoading(true));

        try {
            const res = await validateLogin(username, password);
            if (res.ok) {
                const user = auth.currentUser;
                if (user) {
                    dispatch(setUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    }));
                }
                // Track login success
                trackEvent(AppCenterEvents.LOGIN_SUCCESS, { email: username });
                router.replace('/home');
            } else {
                setErrors({ username: res.error, password: 'Verifique usuário e senha' });
                dispatch(setError(res.error));
                // Track login failure
                trackEvent(AppCenterEvents.LOGIN_FAILED, { error: res.error });
            }
        } catch (error) {
            setErrors({ username: 'Erro ao conectar', password: 'Tente novamente' });
            dispatch(setError('Erro ao conectar'));
        } finally {
            setIsLoading(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <Box className="flex-1 bg-background-50">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <VStack className="px-6 py-8" space="lg">
                    <VStack className="items-center mb-8" space="md">
                        <Box className="bg-red-100 w-24 h-24 rounded-full items-center justify-center">
                            <Image source={{ uri: randomPokemon.image }} alt={randomPokemon.name} className="w-16 h-16" resizeMode="contain" />
                        </Box>
                        <Text className="text-3xl font-bold text-typography-900">Welcome Back!</Text>
                        <Text className="text-typography-500">Ready to catch 'em all, Trainer?</Text>
                    </VStack>

                    <VStack space="md">
                        <Text className="text-typography-700 font-medium">Username or Email</Text>
                        <Input variant="rounded" className="bg-background-0">
                            <InputField
                                value={username}
                                onChangeText={setUsername}
                                placeholder="adm@adm.com.br"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </Input>
                        {errors.username && (
                            <Text className="text-red-600 text-xs">{errors.username}</Text>
                        )}
                    </VStack>

                    <VStack space="md">
                        <Text className="text-typography-700 font-medium">Password</Text>
                        <Input variant="rounded" className="bg-background-0">
                            <InputField
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                secureTextEntry
                            />
                        </Input>
                        {errors.password && (
                            <Text className="text-red-600 text-xs">{errors.password}</Text>
                        )}
                        <Pressable onPress={() => { }}>
                            <Text className="text-red-500 font-medium self-end">Forgot Password?</Text>
                        </Pressable>
                    </VStack>

                    <Button className="mt-2 bg-red-500" onPress={onLogin} disabled={isLoading}>
                        <ButtonText>{isLoading ? 'Entrando...' : 'Log In →'}</ButtonText>
                    </Button>

                    <VStack className="items-center mt-6" space="sm">
                        <Box className="w-full h-[1px] bg-outline-200" />
                        <Pressable onPress={() => { }}>
                            <Text className="text-red-500 font-semibold">Create an Account</Text>
                        </Pressable>
                    </VStack>
                </VStack>
            </ScrollView>
        </Box>
    );
}
