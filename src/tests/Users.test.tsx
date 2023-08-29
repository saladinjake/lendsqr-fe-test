import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../routes/index";

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
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import UsersDashBoard from "../modules/dashboard/index";



import { BrowserRouter } from "react-router-dom";
const modeUrl = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://victorjuwa-lendsqr-fe-test.vercel.app";

const mockServer = setupServer(
  rest.get(`${modeUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: "victor",
        lastName: "Juwa",
        role: "Lead developer",
      })
    );
  })
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
const authClient = {
    isAuthenticated: getAuthProfile,
    login: loginUser,
    logout: logoutUser,
  };

describe("Users lists", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;
  it("renders without crashing", () => {
     const component = render(
        <React.StrictMode>
        <Provisioner store={Store}>
          <AuthProvider client={authClient}>
            <UsersDashBoard />
          </AuthProvider>
        </Provisioner>
      </React.StrictMode>
    );
    expect(component.container).toMatchSnapshot();

    expect(screen.getByText(/102,453/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Users with loans/i)).toBeInTheDocument();
    expect(screen.getByText(/Users with savings/i)).toBeInTheDocument();
  });

  it('should display list of users', async () => {
  	 const { container } = render(  <React.StrictMode>
        <Provisioner store={Store}>
          <AuthProvider client={authClient}>
            <UsersDashBoard />
          </AuthProvider>
        </Provisioner>
      </React.StrictMode>
  	);

      
  	waitFor(() => {
  		const table = screen.getByTestId('table-responsive');
    
  		expect(table).toBeInTheDocument();


          let usersList: any = container.querySelector('.random-selector-test-case') ;
          expect(usersList.length).toBeGreaterThan(0);

          usersList.forEach( (item:any, index: number)  => {
             expect(item).toHaveAttribute('class', index +'-test-users')
           })
  	});
  });
});
