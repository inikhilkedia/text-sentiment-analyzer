import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import UserDropdown from './UserDropdown';

describe('UserDropdown', () => {
	it('renders user dropdown with options', async () => {
		const mockHandleUserChange = jest.fn();
		await render(
			<UserDropdown
				currentUser='Admin'
				handleUserChange={mockHandleUserChange}
			/>
		);

		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByText('Admin')).toBeInTheDocument();
		expect(screen.getByText('User1')).toBeInTheDocument();
		expect(screen.getByText('User2')).toBeInTheDocument();
	});

	it('calls handleUserChange when selecting a different user', async () => {
		const mockHandleUserChange = jest.fn();
		const { user } = await render(
			<UserDropdown
				currentUser='Admin'
				handleUserChange={mockHandleUserChange}
			/>
		);

		const select = screen.getByRole('combobox');
		await user.selectOptions(select, 'User1');

		expect(mockHandleUserChange).toHaveBeenCalledTimes(1);
		const event = mockHandleUserChange.mock.calls[0][0];
		expect(event.type).toBe('change');
		expect(event.target).toBeInstanceOf(HTMLSelectElement);
		expect(event.target.value).toBe('User1');
	});
});
