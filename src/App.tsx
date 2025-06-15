// Updated App.tsx in TypeScript with clean architecture
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignInForm from './components/SignInForm';
import Signup from './components/Signup';
import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<SignInForm />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <JoinRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:roomId"
        element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to rooms if authenticated, otherwise to login */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/rooms" replace />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to rooms */}
      <Route path="*" element={<Navigate to="/rooms" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
