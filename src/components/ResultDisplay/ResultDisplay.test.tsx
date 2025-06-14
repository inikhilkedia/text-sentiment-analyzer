import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import ResultDisplay from './ResultDisplay';

describe('ResultDisplay', () => {
	const mockAnalysisResult = {
		sentiment: 'positive',
		score: 0.8,
		magnitude: 0.5,
	};

	it('renders nothing when analysisResult is null', async () => {
		const { container } = await render(<ResultDisplay analysisResult={null} />);
		expect(container).toBeEmptyDOMElement();
	});

	it('renders analysis result with positive sentiment', async () => {
		await render(<ResultDisplay analysisResult={mockAnalysisResult} />);

		expect(screen.getByText('Positive')).toBeInTheDocument();
		expect(screen.getByText('Score: 0.80')).toBeInTheDocument();
		expect(screen.getByText('Magnitude: 0.50')).toBeInTheDocument();
	});

	it('renders analysis result with negative sentiment', async () => {
		const negativeResult = {
			...mockAnalysisResult,
			sentiment: 'negative',
			score: -0.8,
		};

		await render(<ResultDisplay analysisResult={negativeResult} />);

		expect(screen.getByText('Negative')).toBeInTheDocument();
		expect(screen.getByText('Score: -0.80')).toBeInTheDocument();
		expect(screen.getByText('Magnitude: 0.50')).toBeInTheDocument();
	});

	it('renders analysis result with neutral sentiment', async () => {
		const neutralResult = {
			...mockAnalysisResult,
			sentiment: 'neutral',
			score: 0,
		};

		await render(<ResultDisplay analysisResult={neutralResult} />);

		expect(screen.getByText('Neutral')).toBeInTheDocument();
		expect(screen.getByText('Score: 0.00')).toBeInTheDocument();
		expect(screen.getByText('Magnitude: 0.50')).toBeInTheDocument();
	});
});
