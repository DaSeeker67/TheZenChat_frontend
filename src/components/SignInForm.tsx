import { useState } from "react";
import type { FormEvent } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

interface SignInFormProps {
    onNext: () => void;
}

interface SignInResponse {
    token: string;
    message?: string;
}

export default function SignInForm({ onNext }: SignInFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await API.post<SignInResponse>('api/auth/register', { username, password,email });
            signIn(username, response.data.token);
            onNext();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Sign in failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">Sign In</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input className="w-full mb-2 p-2 border rounded"
                placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input className="w-full mb-2 p-2 border rounded"
                placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="w-full mb-4 p-2 border rounded" type="password"
                placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={handleSignIn}>
                Sign In
            </button>
        </div>
    );
}