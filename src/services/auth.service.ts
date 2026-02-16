import { supabase } from '@/lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// Define explicit interface for User to avoid 'never' issues
export interface AppUser extends User {
    id: string;
    email?: string;
    full_name?: string;
}

export interface AuthResponse {
    user: User | null;
    session: Session | null;
    error: AuthError | null;
}

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string, fullName?: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        }
    });

    // Create profile after signup
    if (data.user && !error) {
        await (supabase as any).from('profiles').insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName || null,
        } as any);
    }

    return {
        user: data.user,
        session: data.session,
        error,
    };
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return {
        user: data.user,
        session: data.session,
        error,
    };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
}

/**
 * Get current user session
 */
export async function getCurrentSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: {
    full_name?: string;
    avatar_url?: string;
}) {
    const { data, error } = await (supabase as any)
        .from('profiles')
        .update(updates as any)
        .eq('id', userId)
        .select()
        .single();

    return { data, error };
}

/**
 * Get user profile
 */
export async function getProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    return { data, error };
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    return { data, error };
}
