import { Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "../layouts/ErrorBoundary";
//import PrivateRoute from "./PrivateRoute";
import Fallback from "../views/Fallback";


const pageMap = {
  "test-management": lazy(() => import("modules/TestModule")),
  "test-management/:id": lazy(
    () => import("modules/TestModule/Test")
  ),
};

const routes = [
  {
    path: "/test-module-sample",
    component: lazy(() => import("modules/TestModule")),
  },

 
  
];

//const UserDashboard = lazy(() => import("../views/UserDashboard"));
const Login = lazy(() => import("../views/Login"));
const NotFound = lazy(() => import("../views/NotFound"));



function DefaultLayout() {
  const [isLoading,setIsLoading] = useState(false)
  

 

  const LoadingRoutes = () => {
    return <div>initializing....</div>;
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/login/*" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* <Route element={<PrivateRoute />}> */}
            {/* <Route path="/dashboard/*" element={<UserDashboard />} /> */}

            {isLoading ? (
              <Route path="*" element={<LoadingRoutes />} />
            ) : (
              routes.map((route) => (
                <Route path={route.path} element={<route.component />} />
              ))
            )}
          {/* </Route> */}

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default DefaultLayout;
