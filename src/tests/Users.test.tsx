import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UsersDashBoard from '../modules/dashboard/index';

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
const modeUrl = process.env.NODE_ENV =="development" ? "http://localhost:3000": "https://victorjuwa-lendsqr-fe-test.vercel.app"

const mockServer = setupServer(
	rest.get(`${process.env.REACT_APP_API_URL}/users`, (req, res, ctx) => {
		return res(ctx.json({ firstName: 'victor', lastName:"Juwa", role:"Lead developer" }));
	})
);


beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('Users lists', () => {



	it('renders without crashing', () => {
        render(
        	<BrowserRouter>
          
                <UsersDashBoard />
           
            </BrowserRouter>
        );



        expect(
            screen.getByText(/USER WITH SAVINGS/i)
        ).toBeInTheDocument();
    });


	// it('should display list of users', async () => {
	// 	render(	<BrowserRouter>
	// 		    <UsersDashBoard  />
	// 		</BrowserRouter>
	// 	);
	// 	waitFor(() => {
	// 		const table = screen.getByTestId('table');
	// 		expect(table).toBeInTheDocument();
	// 	});
	// });
});