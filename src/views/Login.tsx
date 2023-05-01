import { Route, Routes, Navigate } from "react-router-dom";
import Login from "modules/Authentication/index";
import ForgotPassword from "modules/Authentication/ForgotPassword";
import ResetPassword from "modules/Authentication/ResetPassword";
import GuestLayout from "layouts/GuestLayout";
function LoginPage() {
  return (
    <div className="guest">
      <GuestLayout>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/password/reset/:id" element={<ResetPassword />} />
          <Route path="/*" element={<Navigate to="/get-started" replace />} />
        </Routes>
      </GuestLayout>
    </div>
  );
}

export default LoginPage;
