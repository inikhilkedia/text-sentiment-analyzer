import React, { act } from 'react';
import {
	render as rtlRender,
	RenderResult,
	waitFor,
	screen,
} from '@testing-library/react';
import * as userEvent from '@testing-library/user-event';

async function render(ui: React.ReactElement) {
	const user = userEvent.default;
	let result: RenderResult | undefined;

	// Wrap the initial render in act
	await act(async () => {
		result = rtlRender(
			<React.Suspense fallback={<div>Loading...</div>}>{ui}</React.Suspense>
		);
	});

	// Wait for Suspense to resolve and any pending state updates
	await act(async () => {
		await waitFor(
			() => {
				expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
			},
			{ timeout: 1000 }
		);
	});

	// Wait for any remaining state updates
	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0));
	});

	if (!result) {
		throw new Error('Render result is undefined');
	}

	return {
		user,
		...result,
	};
}

// Re-export everything
export { render };
export * from '@testing-library/react';
