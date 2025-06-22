import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import InputField from './InputField';

describe('InputField', () => {
	const mockHandleInputChange = jest.fn();
	const mockHandleSubmit = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders input field and submit button', async () => {
		await render(
			<InputField
				userInput=''
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const input = await screen.findByPlaceholderText('Enter text here...');
		const button = await screen.findByRole('button');

		expect(input).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	it('calls handleInputChange when typing', async () => {
		const { user } = await render(
			<InputField
				userInput=''
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const input = await screen.findByPlaceholderText('Enter text here...');
		await user.type(input, 'test');

		expect(mockHandleInputChange).toHaveBeenCalledTimes(4); // Once for each character
	});

	it('calls handleSubmit when clicking button', async () => {
		const { user } = await render(
			<InputField
				userInput='test'
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const button = await screen.findByRole('button');
		await user.click(button);

		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
	});

	it('calls handleSubmit when pressing Enter', async () => {
		const { user } = await render(
			<InputField
				userInput='test'
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const input = await screen.findByPlaceholderText('Enter text here...');
		await user.type(input, '{enter}');

		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
	});

	it('disables submit button when input is empty', async () => {
		await render(
			<InputField
				userInput=''
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const button = await screen.findByRole('button');
		expect(button).toBeDisabled();
	});

	it('enables submit button when input has text', async () => {
		await render(
			<InputField
				userInput='test'
				handleInputChange={mockHandleInputChange}
				handleSubmit={mockHandleSubmit}
			/>
		);

		const button = await screen.findByRole('button');
		expect(button).not.toBeDisabled();
	});
});
