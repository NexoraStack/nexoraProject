import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/auth-context";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProfilePage from "./pages/ProfilePage";

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }) {
  const { session } = useAuth();
  return session ? <Navigate to="/dashboard" replace /> : children;
}

const publicOnlyRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
];

const protectedRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/profile", element: <ProfilePage /> },
];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {publicOnlyRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicOnlyRoute>{element}</PublicOnlyRoute>}
        />
      ))}

      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}

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
