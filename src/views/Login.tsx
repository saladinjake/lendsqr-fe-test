import { Route, Routes, Navigate } from "react-router-dom";
import LoginLayout from "../modules/TestModule";
import DashboardLayout from "../layouts/LayoutOne";
function Login() {
  return (
      <Routes>
            <Route index element={<LoginLayout />} />
            <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
  );
}

export default Login;
