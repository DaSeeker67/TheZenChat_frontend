import { useState } from "react";

interface JoinRoomProps {
    onJoin: (roomId: string) => void;
}

export default function JoinRoom({ onJoin }: JoinRoomProps) {
    const [roomId, setRoomId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleJoin = async () => {
        if (roomId.trim()) {
            setIsLoading(true);
            setError('');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Simulate random error for demo
                if (Math.random() > 0.8) {
                    throw new Error('Room not found');
                }
                
                onJoin(roomId);
            } catch (err: any) {
                setError(err.message || 'Failed to join room');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && roomId.trim() && !isLoading) {
            handleJoin();
        }
    };

    const formatRoomId = (value: string) => {
        // Format as XXX-XXX for better readability
        const cleaned = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
        if (cleaned.length <= 3) return cleaned;
        return cleaned.slice(0, 3) + '-' + cleaned.slice(3, 6);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400/20 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-teal-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-cyan-400/10 rounded-lg animate-pulse"></div>
                <div className="absolute top-1/3 right-16 w-20 h-20 border-2 border-emerald-300/10 rounded-xl rotate-12 animate-pulse"></div>
            </div>

            {/* Network connection lines */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <svg className="w-full h-full">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.1"/>
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,200 Q400,100 800,200 T1600,200"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                    />
                    <path
                        d="M0,400 Q400,300 800,400 T1600,400"
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: '1s' }}
                    />
                </svg>
            </div>

            {/* Main form container */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-emerald-500/25">
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 p-px animate-pulse">
                        <div className="h-full w-full rounded-3xl bg-slate-900/90 backdrop-blur-2xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                <div className="w-10 h-10 border-2 border-white rounded-lg relative">
                                    <div className="absolute inset-1 border border-white/50 rounded"></div>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                Join Room
                            </h1>
                            <p className="text-white/60 text-sm">Enter the room code to connect instantly</p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm transform animate-bounce">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Room code input */}
                        <div className="relative mb-8 group">
                            <input
                                type="text"
                                placeholder="XXX-XXX"
                                value={roomId}
                                onChange={(e) => setRoomId(formatRoomId(e.target.value))}
                                onKeyPress={handleKeyPress}
                                onFocus={() => setFocusedField('roomId')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full p-6 text-center text-2xl font-mono tracking-widest bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-400/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm uppercase"
                                maxLength={7}
                            />
                            
                            {/* Input focus glow effect */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 transition-all duration-300 pointer-events-none ${focusedField === 'roomId' ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}></div>
                            
                            {/* Floating label */}
                            {roomId && (
                                <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-xs text-emerald-400 font-medium">
                                    Room Code
                                </div>
                            )}
                            
                            {/* Character count indicator */}
                            <div className="absolute -bottom-6 right-0 text-xs text-white/40">
                                {roomId.replace('-', '').length}/6
                            </div>
                        </div>

                        {/* Quick join buttons */}
                        <div className="mb-6">
                            <p className="text-white/40 text-xs mb-3 text-center">Quick Join</p>
                            <div className="flex space-x-2">
                                {['ABC-123', 'XYZ-789', 'DEF-456'].map((code) => (
                                    <button
                                        key={code}
                                        onClick={() => setRoomId(code)}
                                        className="flex-1 py-2 px-3 text-xs font-mono bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-200"
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Join button */}
                        <button
                            onClick={handleJoin}
                            disabled={!roomId.trim() || isLoading || roomId.replace('-', '').length < 3}
                            className="relative w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                        >
                            {/* Button hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Loading state */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            )}
                            
                            <span className={`relative z-10 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                {isLoading ? 'Connecting...' : 'Join Room'}
                            </span>
                        </button>

                        {/* Footer info */}
                        <div className="mt-8 text-center space-y-3">
                            <div className="flex items-center justify-center space-x-4">
                                <div className="w-8 h-px bg-white/20"></div>
                                <span className="text-white/30 text-xs">SECURE CONNECTION</span>
                                <div className="w-8 h-px bg-white/20"></div>
                            </div>
                            
                            <p className="text-white/40 text-xs">
                                Room codes are case-insensitive and expire after 24 hours
                            </p>
                            
                            <div className="flex items-center justify-center space-x-2 text-white/30">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-xs">Real-time connection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}