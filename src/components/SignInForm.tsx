import { useState } from "react";
import type { FormEvent } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignInResponse {
    token: string;
    message?: string;
}

export default function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');
        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email.");
            setIsLoading(false);
            return;
        }

        if(password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setIsLoading(false);
            return;
        }

        if(username.length < 3) {
            setError("Username must be at least 3 characters long.");
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await API.post<SignInResponse>('api/auth/login', { 
                username, 
                password, 
                email 
            });
            signIn(username, response.data.token);
            navigate('/rooms');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Glassmorphism form container */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-pink-500/50 p-px">
                        <div className="h-full w-full rounded-3xl bg-slate-900/80 backdrop-blur-xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                        {/* Header with animated gradient text */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-500">
                                <div className="w-10 h-10 border-2 border-white rounded-xl"></div>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
                                Welcome Back
                            </h1>
                            <p className="text-white/60 text-sm">Login to continue your journey</p>
                        </div>

                        {/* Error message with slide animation */}
                        {error && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm transform animate-bounce">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Username field */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'username' ? 'opacity-100' : 'opacity-0'}`}></div>
                                {/* Floating label effect */}
                                {username && (
                                    <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-purple-400 font-medium">
                                        Username
                                    </div>
                                )}
                            </div>

                            {/* Email field */}
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`}></div>
                                {email && (
                                    <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-cyan-400 font-medium">
                                        Email
                                    </div>
                                )}
                            </div>

                            {/* Password field */}
                            <div className="relative group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'}`}></div>
                                {password && (
                                    <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-pink-400 font-medium">
                                        Password
                                    </div>
                                )}
                            </div>

                            {/* Submit button with loading animation */}
                            <button
                                type="button"
                                onClick={handleSignIn}
                                disabled={isLoading || !username || !email || !password}
                                className="relative w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                            >
                                {/* Button background animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Loading spinner */}
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                                
                                <span className={`relative z-10 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-white/40 text-sm">
                                Don't have an account?{' '}
                                <span 
                                    className="text-purple-400 hover:text-purple-300 cursor-pointer ml-1 transition-colors duration-200"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </span>
                            </p>
                            <div className="mt-4 flex items-center justify-center space-x-4">
                                <div className="w-8 h-px bg-white/20"></div>
                                <span className="text-white/30 text-xs">OR</span>
                                <div className="w-8 h-px bg-white/20"></div>
                            </div>
                            <p className="text-white/30 text-xs mt-4">
                                Secured with end-to-end encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}