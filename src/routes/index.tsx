import React from "react";
import {  lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";


import AuthLayout from "../utils/layouts/AuthLayout";
import PrivateLayouts from "../utils/layouts/PrivateLayouts";
import PublicScenesLayout from "../utils/layouts/PublicScenesLayout";
import PageNotFound from "../components/basic/NotFound"

const isLoading = false;
const getUserInSession = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user_token");
      resolve(user);
    }, 3000)
  );

const routes = [
  {
    path: "/*",
    component: lazy(() => import("../views/public/")),
  },
  {
    path: "/users/*",
    component: lazy(() => import("../views/users")),
  },
  {
    path: "/dashboard/*",
    component: lazy(() => import("../views/dashboard")),
  },
];

const AppNavigator = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserInSession() })}
    >
      {isLoading ? (
        <Route path="*" element={<>LOADING..</>} />
      ) : (
        routes.map((route, i) => (
          <Route key={i} path={route.path} element={<route.component />} />
        ))
      )}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/not-found" element={<PageNotFound  />} />
    </Route>
  )
);
export default AppNavigator;
