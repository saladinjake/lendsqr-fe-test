import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";

import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider as Provisioner } from "react-redux";
import Store from "./redux/store";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationBar from "./components/shared/Notifier";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppNavigator from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { loginUser, logoutUser } from "./api/auth.service";
import { getAuthProfile } from "./api/user.service";

const authClient = {
  isAuthenticated: getAuthProfile,
  login: loginUser,
  logout: logoutUser,
};

ReactDOM.render(
  <React.StrictMode>
    <Provisioner store={Store}>
      <NotificationProvider>
        <NotificationBar />
        <AuthProvider client={authClient}>
          <RouterProvider router={AppNavigator} />
        </AuthProvider>
      </NotificationProvider>
    </Provisioner>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
