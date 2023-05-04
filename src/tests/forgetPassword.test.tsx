import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ForgetPassword from '../modules/Authentication/Form/LoginTraditional/ForgetPassword/ForgotPass';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/*test authentication with redux implementation*/

describe('Login component', () => {
	 const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

	it('should have an email reset field', () => {
		store = mockStore(initialState);
		render(

			<BrowserRouter>
			  <Provider store={store}>
				<ForgetPassword />
			</Provider>
			</BrowserRouter>
		);
		const passwordField = screen.getByPlaceholderText(/Enter Name/i);
		const submitButton = screen.getByRole('button');
		expect(passwordField).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	it('should show error messages ', async () => {
		store = mockStore(initialState);
		render(
			<BrowserRouter>
			  <Provider store={store}>
				<ForgetPassword />
				</Provider>
			</BrowserRouter>
		);
		const submitButton = screen.getByRole('button');
		await userEvent.click(submitButton);
		waitFor(() => {
			const emailError = screen.getByText(/Enter Name/i);
			expect(emailError).toBeInTheDocument();
		});
	});

	it('should allow a user to submit their email ', () => {
		store = mockStore(initialState);
		render(
			<BrowserRouter>
			  <Provider store={store}>
				<ForgetPassword />
			</Provider>
			</BrowserRouter>
		);
		const emailField = screen.getByPlaceholderText(/Enter Name/i);
		const submitButton = screen.getByRole('button');

		userEvent.type(emailField, 'simon@gmail.com');
		userEvent.click(submitButton);
	});
});
