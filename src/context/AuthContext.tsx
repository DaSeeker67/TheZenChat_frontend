import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (username: string, token: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const signIn = (username: string, token: string) => {
        localStorage.setItem('token', token);
        setUser({ username });
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

