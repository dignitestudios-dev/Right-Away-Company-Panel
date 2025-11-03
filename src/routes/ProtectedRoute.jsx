// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
}
