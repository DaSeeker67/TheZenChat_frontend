import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";

interface AuthContextType {
    user: string | null;
    signIn: (username: string, token: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser(username);
        }
    }, []);

    const signIn = (username: string, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setUser(username);
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

