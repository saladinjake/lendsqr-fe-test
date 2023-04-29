import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/LayoutOne";
import UserDashboardHome from "../modules/TestModule";

function UserDashboard() {
  return (
    <DashboardLayout>
    <Routes>
      <Route index element={<UserDashboardHome />} />
    </Routes>
    </DashboardLayout>
  );
}

export default UserDashboard;
