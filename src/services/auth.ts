import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function validateLogin(email: string, password: string): Promise<LoginResult> {
    if (!email || email.length < 3) return { ok: false, error: 'Informe usuário/email válido' };
    if (!password || password.length < 6) return { ok: false, error: 'Senha deve ter ao menos 6 caracteres' };

    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { ok: true };
    } catch (error: any) {
        let errorMessage = 'Erro ao fazer login';

        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Usuário não encontrado';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Senha incorreta';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Email inválido';
        } else if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Credenciais inválidas';
        }

        return { ok: false, error: errorMessage };
    }
}
