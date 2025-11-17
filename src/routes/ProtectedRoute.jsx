// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, isOnboardingStep } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  // If user is already authenticated, send them to dashboard
  if (isAuthenticated && location?.pathname !== "/auth/signup") {
    return <Navigate to="/app/dashboard" replace />;
  }

  const authPublicPaths = [
    "/auth/login",
    "/auth/two-factor-verfication",
    "/auth/forgot-password",
    "/auth/otp-verification",
    "/auth/reset-password",
    "/auth/password-updated",
  ];

  const isOnAuthPublicPath = authPublicPaths.some((p) =>
    location?.pathname?.startsWith(p)
  );

  if (isOnAuthPublicPath && Number(isOnboardingStep) > 0) {
    return <Navigate to="/auth/signup" replace />;
  }

  // Otherwise, render the public content (login/signup)
  return children;
}
