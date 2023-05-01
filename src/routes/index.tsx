import { Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Fallback from "../views/Fallback";
import { useQuery } from "@tanstack/react-query";


const Login = lazy(() => import("../views/Login"));
const NotFound = lazy(() => import("../views/NotFound"));
const UserDashBoard = lazy(() => import("../views/UserDashboard"));
const UserDetail = lazy(() => import("../views/UserDetail"));

function DefaultLayout() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        {/* <Route path="/" element={<Navigate to="/get-started" replace />} /> */}

        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/*" element={<UserDashBoard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />}  />
          
          <Route path="/user/:id" element={<UserDetail />} /> 
        {/* </Route> */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default DefaultLayout;
