import { useState } from 'react';
import { signIn } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToSignup?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error } = await signIn(email, password);

            if (error) {
                setError(error.message);
            } else {
                onSuccess?.();
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                />
            </div>

            {error && (
                <div className="text-sm text-red-500 dark:text-red-400">
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            {onSwitchToSignup && (
                <div className="text-center text-sm">
                    Não tem uma conta?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToSignup}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Cadastre-se
                    </button>
                </div>
            )}
        </form>
    );
}
