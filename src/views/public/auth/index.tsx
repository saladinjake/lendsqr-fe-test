import { Route, Routes } from "react-router-dom";
import LoginLanding from "../../../modules/auth/login/LoginForm";


function AuthenticationRouter() {
  return (
    <Routes>
      <Route index path="/" element={<LoginLanding />} />
      <Route path="/login" element={<LoginLanding />} />
    </Routes>
  );
}

export default AuthenticationRouter;
