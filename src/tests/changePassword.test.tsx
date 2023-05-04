import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ChangePassword from '../modules/Authentication/Form/LoginTraditional/ChangePassword/ResetPassword';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/*test authentication with redux implementation*/

describe('Login component', () => {
	 const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

	it('should have  2 password field, and a submit button', () => {
		store = mockStore(initialState);
		render(

			<BrowserRouter>
			  <Provider store={store}>
				<ChangePassword />password
			</Provider>
			</BrowserRouter>
		);
		const passwordField = screen.getByPlaceholderText(/Enter Password/i);
		const password2Field = screen.getByPlaceholderText(/Enter Confirmation Password/i);
		const submitButton = screen.getByRole('button');
		expect(passwordField).toBeInTheDocument();
		expect(password2Field).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	it('error in password', async () => {
		store = mockStore(initialState);
		render(
			<BrowserRouter>
			  <Provider store={store}>
				<ChangePassword />
				</Provider>
			</BrowserRouter>
		);
		const submitButton = screen.getByRole('button');
		await userEvent.click(submitButton);
		waitFor(() => {
			const emailError = screen.getByText(/Enter Password/i);
			expect(emailError).toBeInTheDocument();
		});
	});

	it('should allow a user to change  their  password', () => {
		store = mockStore(initialState);
		render(
			<BrowserRouter>
			  <Provider store={store}>
				<ChangePassword />
			</Provider>
			</BrowserRouter>
		);
		const passwordField = screen.getByPlaceholderText(/Enter Password/i);
		const passwordField2 = screen.getByPlaceholderText(/Enter Confirmation Password/i);
		const submitButton = screen.getByRole('button');

		userEvent.type(passwordField, 'password');
		userEvent.type(passwordField2, 'password');
		userEvent.click(submitButton);
	});
});
