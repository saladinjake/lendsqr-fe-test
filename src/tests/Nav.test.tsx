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




import "@testing-library/jest-dom";

//components

import NavBar from "../components/shared/NavBar";

const modeUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://victorjuwa-lendsqr-fe-test.vercel.app";

const mockServer = setupServer(
  rest.get(`${process.env.REACT_APP_API_URL}/users`, (req, res, ctx) => {
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


describe("Nav Bar Component", () => {
    const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  it("renders without crashing on large screen", () => {

    store = mockStore(initialState);
    const component = render(
      <BrowserRouter>
        <NavBar isOpen={false} setIsOpen={(value)=>console.log(value)} />
      </BrowserRouter>
    );
    expect(component.container).toMatchSnapshot();

  
  });

  it('should display Nav Component On the browser', async () => {
    render(	<BrowserRouter>
              <NavBar isOpen={false} setIsOpen={(value)=>console.log(value)} />
        </BrowserRouter>
    );
    waitFor(() => {
        const nav = screen.getByTestId('nav-responsive');
        expect(nav).toBeInTheDocument();
    });
});

  it('should contain nav items while on large screen', async () => {
  	render(	<BrowserRouter>
  		    <NavBar isOpen={false} setIsOpen={(value)=>console.log(value)} />
  		</BrowserRouter>
  	);
  	waitFor(() => {
        const searchField = screen.getByPlaceholderText(/Search for anything/i);
        const linkField = screen.getByText(/Docs/i);
        const searchButton = screen.getByRole("button");
        expect(searchField).toBeInTheDocument();
        expect(linkField).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
  	});
  });
});