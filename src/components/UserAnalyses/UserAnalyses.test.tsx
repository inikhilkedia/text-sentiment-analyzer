import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import UserAnalyses from './UserAnalyses';
import { Analysis } from '../../types/index';

describe('UserAnalyses', () => {
	const mockAnalyses: Analysis[] = [
		{
			id: '1',
			text: 'This is a positive text',
			result: {
				sentiment: 'positive',
				score: 0.8,
				magnitude: 0.8,
			},
			timestamp: '2024-03-20T10:00:00Z',
			user: 'Admin',
		},
		{
			id: '2',
			text: 'This is a negative text',
			result: {
				sentiment: 'negative',
				score: -0.6,
				magnitude: 0.6,
			},
			timestamp: '2024-03-20T11:00:00Z',
			user: 'User1',
		},
	];

	it('renders no analyses message when analyses array is empty', () => {
		render(<UserAnalyses analyses={[]} />);
		expect(screen.getByText(/no analyses found/i)).toBeInTheDocument();
	});

	it('renders all analyses in a table', () => {
		render(<UserAnalyses analyses={mockAnalyses} />);

		// Check table headers
		expect(screen.getByText(/text/i)).toBeInTheDocument();
		expect(screen.getByText(/sentiment/i)).toBeInTheDocument();
		expect(screen.getByText(/score/i)).toBeInTheDocument();
		expect(screen.getByText(/magnitude/i)).toBeInTheDocument();
		expect(screen.getByText(/timestamp/i)).toBeInTheDocument();
		expect(screen.getByText(/user/i)).toBeInTheDocument();

		// Check first analysis
		expect(screen.getByText('This is a positive text')).toBeInTheDocument();
		expect(screen.getByText('positive')).toBeInTheDocument();
		expect(screen.getByText('0.8')).toBeInTheDocument();
		expect(screen.getByText('Admin')).toBeInTheDocument();

		// Check second analysis
		expect(screen.getByText('This is a negative text')).toBeInTheDocument();
		expect(screen.getByText('negative')).toBeInTheDocument();
		expect(screen.getByText('-0.6')).toBeInTheDocument();
		expect(screen.getByText('User1')).toBeInTheDocument();
	});

	it('formats timestamps correctly', () => {
		render(<UserAnalyses analyses={mockAnalyses} />);

		// Check if timestamps are present and contain the date parts
		const timestamps = screen.getAllByText(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
		expect(timestamps).toHaveLength(2);

		// Verify each timestamp contains a time component
		timestamps.forEach(timestamp => {
			expect(timestamp.textContent).toMatch(/\d{1,2}:\d{2}/);
		});
	});

	it('applies correct sentiment styling', () => {
		render(<UserAnalyses analyses={mockAnalyses} />);

		const positiveCell = screen.getByText('positive').closest('td');
		const negativeCell = screen.getByText('negative').closest('td');

		// Check for CSS module classes that contain the sentiment name
		expect(positiveCell?.className).toMatch(/positive/);
		expect(negativeCell?.className).toMatch(/negative/);
	});
});
