import React, { useCallback, memo } from 'react';
import styles from './ResultDisplay.module.css';

interface AnalysisResult {
	sentiment: string;
	score: number;
	magnitude: number;
}

interface Props {
	analysisResult: AnalysisResult | null;
}

const ResultDisplay: React.FC<Props> = ({ analysisResult }) => {
	const getResultStyle = useCallback((sentiment: string) => {
		switch (sentiment) {
			case 'positive':
				return styles.positive;
			case 'neutral':
				return styles.neutral;
			case 'negative':
				return styles.negative;
			default:
				return '';
		}
	}, []);

	if (!analysisResult) return null;

	const { sentiment, score, magnitude } = analysisResult;
	const formattedSentiment =
		sentiment.charAt(0).toUpperCase() + sentiment.slice(1);

	return (
		<div className={`${styles.result} ${getResultStyle(sentiment)}`}>
			<p>{formattedSentiment}</p>
			<p>Score: {score.toFixed(2)}</p>
			<p>Magnitude: {magnitude.toFixed(2)}</p>
		</div>
	);
};

export default memo(ResultDisplay);
