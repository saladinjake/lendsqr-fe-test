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



import Page404 from "../components/basic/NotFound";

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
    component: lazy(() => import("../views/public/index")),
  },

  {
    path: "/users/*",
    component: lazy(() => import("../views/user/index")),
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
      <Route path="*" element={<Page404 />} />
      <Route path="/not-found" element={<Page404 />} />
    </Route>
  )
);

export default AppNavigator;
