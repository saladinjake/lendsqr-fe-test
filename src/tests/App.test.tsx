import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../routes/index";

import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RouterProvider } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";

import { Provider as Provisioner } from "react-redux";
import Store from "../redux/store";
import { NotificationProvider } from "../contexts/NotificationContext";
import NotificationBar from "../components/shared/Notifier";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppNavigator from "../routes";
import { AuthProvider } from "../contexts/AuthContext";
import { loginUser, logoutUser } from "../api/auth.service";
import { getAuthProfile } from "../api/user.service";

//components
import NavBar from "../components/shared/NavBar";
import SideBar from "../components/shared/Sidebar/index";
import Loader from '../components/basic/Loader';
import NotFound from '../components/basic/NotFound';



//pages
import PublicPagesManagement from '../views/public/index';
import DasboardManagement from '../modules/dashboard/index';



enableFetchMocks();
const modeUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://victorjuwa-lendsqr-fe-test.vercel.app";

const authClient = {
  isAuthenticated: getAuthProfile,
  login: loginUser,
  logout: logoutUser,
};

describe("App renders with out crashing", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  it("Renders with redux provider across all modules", () => {
    store = mockStore(initialState);
    const component = render(
      <React.StrictMode>
        <Provisioner store={Store}>
          <AuthProvider client={authClient}>
            <RouterProvider router={AppNavigator} />
          </AuthProvider>
        </Provisioner>
      </React.StrictMode>
    );
    expect(component.container).toMatchSnapshot();
    component.rerender(
      <React.StrictMode>
        <Provisioner store={Store}>
          <AuthProvider client={authClient}>
            <RouterProvider router={AppNavigator} />
          </AuthProvider>
        </Provisioner>
      </React.StrictMode>
    );
    expect(component.container).toMatchSnapshot();
  });

 


 
});
