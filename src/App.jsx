import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }) {
  const { session } = useAuth();
  return session ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* useTransitions defaults to on, deferring route-match updates via
          startTransition. That let ProtectedRoute observe a stale route with a
          fresh (cleared) session mid-logout and redirect to /login before our
          own navigate("/") landed. Disabling it keeps route updates synchronous. */}
      <BrowserRouter useTransitions={false}>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
