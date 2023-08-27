import React from "react";
/*Import requirements and configuration files*/
import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Routes,
} from "react-router-dom";





// layout switchers
import AuthLayout from "../utils/layouts/AuthLayout";
import PrivateLayouts from "../utils/layouts/PrivateLayouts";
import PublicScenesLayout from "../utils/layouts/PublicScenesLayout";

const getUserInSession = () =>
  //Todo: check if user can access profile with token existing
  //if token is expired log user out else
  //retain exisiting token
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
const isLoading = false;
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
      <Route path="*" element={<>404</>} />
      <Route path="/not-found" element={<>404</>} />
    </Route>
  )
);

export default AppNavigator;
