import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

describe('App', () => {
	test('renders text analyzer app', async () => {
		await render(<App />);

		// Wait for the app to load and check for main components
		const heading = await screen.findByRole('heading', {
			name: /Text Sentiment Analyzer/i,
		});
		expect(heading).toBeInTheDocument();

		// Verify all main components are present
		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Analyze/i })
		).toBeInTheDocument();
	});
});
