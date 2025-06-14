import React, { memo } from 'react';
import styles from './ResultItem.module.css';

interface AnalysisResult {
	sentiment: string;
	score: number;
	magnitude: number;
}

interface Props {
	text: string;
	result: AnalysisResult;
}

const ResultItem: React.FC<Props> = ({ text, result }) => {
	const getResultStyle = (sentiment: string) => {
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
	};

	const { sentiment, score, magnitude } = result;
	const formattedSentiment =
		sentiment.charAt(0).toUpperCase() + sentiment.slice(1);

	return (
		<div className={styles.resultItemContainer}>
			<div className={styles.text}>{text}</div>
			<div className={`${styles.resultBox} ${getResultStyle(sentiment)}`}>
				<div>{formattedSentiment}</div>
				<div className={styles.score}>Score: {score.toFixed(2)}</div>
				<div className={styles.magnitude}>
					Magnitude: {magnitude.toFixed(2)}
				</div>
			</div>
		</div>
	);
};

export default memo(ResultItem);
