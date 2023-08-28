import { Route, Routes, Navigate } from "react-router-dom";
import AuthRoutes from "./auth";


import PublicScenesLayout from "../../utils/layouts/PublicScenesLayout";

function PublicPagesManagement() {
  return (
    <Routes>
      {/* <Route path="/get" element={<PublicScenesLayout />}> */}
        <Route index path="/*" element={<AuthRoutes />}></Route>
        <Route path="/auth/*" element={<AuthRoutes />}></Route>
       
    </Routes>
  );
}
export default PublicPagesManagement;
