import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../utils/tokenConfig";
import Layout from "layouts/LayoutOne";
import {
  getUserFromStore,
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "reducers/authReducer";
import { RootState } from "reducers";
import {  useSelector } from "react-redux";

const PrivateRoute = () => {
  const context = useContext(AuthContext);

  const isAuthenticatedFromStore = useSelector((state: RootState) =>
    getIsAuthenticatedFromStore(state)
  );
  const isAuth = isAuthenticatedFromStore; //authContext.isAuth; //persistence
  const getPersistenceUser = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceRoles = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceAcessTokenFromStore = useSelector((state: RootState) =>
    getAcessTokenFromStore(state)
  );

  return isAuth &&
    getPersistenceRoles?.every((role) => role?.name == "SuperAdmin") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
