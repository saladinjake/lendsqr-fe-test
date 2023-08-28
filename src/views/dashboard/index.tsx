import { Route, Routes, Navigate } from "react-router-dom";



import PrivateScenesLayout  from "../../utils/layouts/PrivateLayouts";

function DashBoardManagement() {
  return (
    <Routes>
    <Route path="/*" element={<PrivateScenesLayout />}> 
       
    </Route>
       
    </Routes>
  );
}
export default DashBoardManagement;