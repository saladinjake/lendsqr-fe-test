import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


const modeUrl = process.env.NODE_ENV =="development" ? "http://localhost:3000": "https://victorjuwa-lendsqr-fe-test.vercel.app"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 2,
    },
  },
});


describe('App renders with out crashing', () => {
	 const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

	it('Renders with redux provider across all modules', () => {
		store = mockStore(initialState);
		const component  = render(

			<BrowserRouter>
			  <Provider store={store}>
				<App />
			</Provider>
			</BrowserRouter>
		);

        expect(component.container).toMatchSnapshot()

        // await userEvent.type(screen.getByRole('textbox'), 'JavaScript')

        // // The magic
        component.rerender(<BrowserRouter>
			  <Provider store={store}>
				<App />
			</Provider>
			</BrowserRouter>)
        expect(component.container).toMatchSnapshot()


		
	});



	
});
