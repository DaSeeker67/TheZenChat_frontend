import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

interface SignupResponse {
    token: string;
    user: {
        email: string;
        username: string;
    };
}

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setError("Please enter a valid email.");
            setIsLoading(false);
            return;
        }

        if(formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setIsLoading(false);
            return;
        }

        if(formData.username.length < 3) {
            setError("Username must be at least 3 characters long.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await API.post<SignupResponse>('api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            signIn(formData.username, response.data.token);
            navigate('/rooms');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
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

            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-white/60 text-sm">Join ZenChat and start chatting</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'username' ? 'opacity-100' : 'opacity-0'}`}></div>
                            {formData.username && (
                                <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-purple-400 font-medium">
                                    Username
                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`}></div>
                            {formData.email && (
                                <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-cyan-400 font-medium">
                                    Email
                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/60 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'}`}></div>
                            {formData.password && (
                                <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-pink-400 font-medium">
                                    Password
                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/60 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 transition-opacity duration-300 pointer-events-none ${focusedField === 'confirmPassword' ? 'opacity-100' : 'opacity-0'}`}></div>
                            {formData.confirmPassword && (
                                <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-xs text-pink-400 font-medium">
                                    Confirm Password
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/40 text-sm">
                            Already have an account?{' '}
                            <span 
                                className="text-purple-400 hover:text-purple-300 cursor-pointer ml-1 transition-colors duration-200"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
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
    );
} 