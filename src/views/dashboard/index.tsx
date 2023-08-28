import { Route, Routes, Navigate } from "react-router-dom";
import DasboardManagement from "../../modules/dashboard";


import PrivateScenesLayout  from "../../utils/layouts/PrivateLayouts";

function DashBoardManagement() {
  return (
    <Routes>
    <Route path="/*" element={<PrivateScenesLayout />}> 
       <Route index element={<DasboardManagement />} />
    </Route>
       
    </Routes>
  );
}
export default DashBoardManagement;