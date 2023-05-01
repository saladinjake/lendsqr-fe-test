import { Route, Routes } from "react-router-dom";
import Dashboard from "../layouts/LayoutOne";
import UserDashboardHome from "modules/UserDashboard/UserDashboardHome";
import UserDetail from "modules/UserDashboard/User";
function UserDashboard() {
  return (
    <Dashboard>
      <Routes>
        <Route index element={<UserDashboardHome />} />
        
      </Routes>
    </Dashboard>
  );
}



export default UserDashboard;
