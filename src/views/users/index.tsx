import { Route, Routes, Navigate } from "react-router-dom";
import ProfileManagement from "../../modules/profile";


import PrivateScenesLayout  from "../../utils/layouts/PrivateLayouts";

function DashBoardManagement() {
  return (
    <Routes>
    <Route path="/*" element={<PrivateScenesLayout />}> 
       <Route path=":id/*" element={<ProfileManagement />} />
    </Route>
       
    </Routes>
  );
}
export default DashBoardManagement;