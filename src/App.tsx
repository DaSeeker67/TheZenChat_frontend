// Updated App.tsx in TypeScript with clean architecture
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignInForm from './components/SignInForm';
import JoinRoom from './components/JoinRoom';
import ChatRoom from './components/ChatRoom';
import { connectSocket } from './services/socket';

function AppContent() {
  const [page, setPage] = useState<'signin' | 'join' | 'chat'>('signin');
  const { user } = useAuth();

  const handleAfterLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
      setPage('join');
    }
  };

  if (!user) return <SignInForm onNext={handleAfterLogin} />;
  if (page === 'join') return <JoinRoom onJoin={() => setPage('chat')} />;
  if (page === 'chat') return <ChatRoom roomId="general" onLeave={() => setPage('join')} />;
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
