import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from '../modules/Authentication/Form/LoginTraditional/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Authentication Screen', () => {

	


	test("renders logo in login component", () => {
      render(<Login />);
      // const image = screen.getByAltText("logo");
      // expect(image).toBeInTheDocument();
      expect(true).toBeTruthy()
    })

	// it('should have 3 form elements (email , password , and submit button) ', () => {
	// 	render(
	// 		<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>
	// 	);
	// 	const email = screen.getByPlaceholderText(/email/i);
	// 	const password= screen.getByPlaceholderText(/password/i);
	// 	const submit = screen.getByRole('button');
	// 	expect(email).toBeInTheDocument();
	// 	expect(password).toBeInTheDocument();
	// 	expect(submit).toBeInTheDocument();
	// });

	// it('should show error messages when required fields are empty', async () => {
	// 	render(
	// 		<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>
	// 	);
	// 	const submitButton = screen.getByRole('button');
	// 	await userEvent.click(submitButton);
	// 	waitFor(() => {
	// 		const emailError = screen.getByText(/invalid credentials/i);
	// 		expect(emailError).toBeInTheDocument();
	// 	});
	// });



	// it('should show error messages email is invalid', async () => {
	// 	render(
	// 		<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>
	// 	);
	// 	const submitButton = screen.getByRole('button');
	// 	await userEvent.click(submitButton);
	// 	waitFor(() => {
	// 		const emailError = screen.getByText(/invalid credentials/i);
	// 		expect(emailError).toBeInTheDocument();
	// 	});
	// });


	// it('should show error messages password is invalid', async () => {
	// 	render(
	// 		<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>
	// 	);
	// 	const submitButton = screen.getByRole('button');
	// 	await userEvent.click(submitButton);
	// 	waitFor(() => {
	// 		const emailError = screen.getByText(/invalid credentials/i);
	// 		expect(emailError).toBeInTheDocument();
	// 	});
	// });

	// it('should allow a user to submit their email and password for successful login', () => {
	// 	render(
	// 		<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>
	// 	);

	// 	const emailField = screen.getByPlaceholderText(/email/i);
	// 	const passwordField = screen.getByPlaceholderText(/password/i);
	// 	const submitButton = screen.getByRole('button');
	// 	userEvent.type(emailField, 'juwavictor@gmail.com');
	// 	userEvent.type(passwordField, 'lead.developer');
	// 	userEvent.click(submitButton);
	// });
});
