import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Login from "../modules/auth/login/LoginForm";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

/*test authentication with redux implementation*/

describe("Login component", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  it("should have an email and password field, and a submit button", () => {
    store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const emailField = screen.getByPlaceholderText(/email/i);
    const passwordField = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button");
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show error messages when required fields are empty", async () => {
    store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);
    waitFor(() => {
      const emailError = screen.getByText(/please enter your email/i);
      expect(emailError).toBeInTheDocument();
    });
  });

  it("should allow a user to submit their email and password", () => {
    store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const emailField = screen.getByPlaceholderText(/email/i);
    const passwordField = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button");

    userEvent.type(emailField, "juwavictor@gmail.com");
    userEvent.type(passwordField, "lead.developer");
    userEvent.click(submitButton);
  });
});
