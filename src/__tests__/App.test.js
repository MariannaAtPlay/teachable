import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import App from '../App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		div
	);
});

it('renders the heading', () => {
	const { getByText } = render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	expect(getByText('Search for Ruby Gems')).toBeInTheDocument();
});

it('search results will load', async () => {
	const { getByText, getByPlaceholderText } = render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	const input = getByPlaceholderText('Search Gems...');

	fireEvent.change(input, { target: { value: 'rails' } });
	// when searching for "rails" there should be at least one element
	// in the search results for the rails gem
	const node = await waitForElement(() => getByText('rails'));

	expect(node).toBeInTheDocument();
});
