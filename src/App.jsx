import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import TwoFactorAuthentication from "./pages/authentication/TwoFactorAuthorization";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import OtpVerification from "./pages/authentication/Verification";
import ResetPassword from "./pages/authentication/ResetPassword";
import PasswordUpdated from "./pages/authentication/PasswordUpdated";
import SignUp from "./pages/onboarding/SignUp";
import Dashboard from "./pages/app/Dashboard";
import ProductManagment from "./pages/app/ProductManagment";
import AddNewProduct from "./components/app/Product/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth/login"} />} />

      <Route path="app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product-management" element={<ProductManagment />} />
        <Route path="add-product" element={<AddNewProduct />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="two-factor-verfication"
          element={<TwoFactorAuthentication />}
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="otp-verification" element={<OtpVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="password-updated" element={<PasswordUpdated />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
