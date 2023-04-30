import { Route, Routes } from "react-router-dom";
import Dashboard from "../layouts/LayoutOne";

import UserDetail from "modules/UserDashboard/User";
function UserDetails() {
  return (
    <Dashboard>
      <Routes>
        <Route index  element={<UserDetail />} />
        
      </Routes>
    </Dashboard>
  );
}



export default UserDetails;