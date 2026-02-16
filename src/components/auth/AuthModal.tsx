import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<'login' | 'signup'>(defaultView);

    const handleSuccess = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {view === 'login' ? 'Entrar na sua conta' : 'Criar nova conta'}
                    </DialogTitle>
                </DialogHeader>

                {view === 'login' ? (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onSwitchToSignup={() => setView('signup')}
                    />
                ) : (
                    <SignupForm
                        onSuccess={handleSuccess}
                        onSwitchToLogin={() => setView('login')}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
