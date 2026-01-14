// src/routes/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
}

// export function PublicRoute({ children }) {
//   const { isOnboardingStep, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );
//   const location = useLocation();
//   const isToken = Cookie.get("token");

//   const [redirectPath, setRedirectPath] = useState(null);

//   useEffect(() => {
//     // If user is already authenticated, redirect to dashboard
//     if (isAuthenticated && location?.pathname !== "/auth/signup") {
//       setRedirectPath("/app/dashboard");
//       return;
//     }

//     const authPublicPaths = [
//       "/auth/login",
//       "/auth/two-factor-verfication",
//       "/auth/forgot-password",
//       "/auth/otp-verification",
//       "/auth/reset-password",
//       "/auth/password-updated",
//     ];

//     const isOnAuthPublicPath = authPublicPaths.some((p) =>
//       location?.pathname?.startsWith(p)
//     );

//     if (isOnAuthPublicPath && Number(isOnboardingStep) > 0) {
//       setRedirectPath("/auth/signup");
//     }
//   }, [isToken, location?.pathname, isOnboardingStep]);

//   if (redirectPath) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children;
// }
