import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/tokenConfig";
import Layout from "layouts/LayoutOne";

const PrivateRoute = () => {
 
  const isAuth = false

  return isAuth && getToken() ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
