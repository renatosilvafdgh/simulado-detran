import { useState } from 'react';
import { signUp } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupFormProps {
    onSuccess?: () => void;
    onSwitchToLogin?: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error } = await signUp(email, password, fullName);

            if (error) {
                setError(error.message);
            } else {
                onSuccess?.();
            }
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    disabled={loading}
                />
            </div>

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
                    minLength={6}
                    disabled={loading}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    A senha deve ter no mínimo 6 caracteres
                </p>
            </div>

            {error && (
                <div className="text-sm text-red-500 dark:text-red-400">
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>

            {onSwitchToLogin && (
                <div className="text-center text-sm">
                    Já tem uma conta?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Faça login
                    </button>
                </div>
            )}
        </form>
    );
}
