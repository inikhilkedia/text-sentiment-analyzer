import React, { memo } from 'react';
import styles from './UserAnalyses.module.css';
import { Analysis } from '../../types/index';

interface Props {
	currentUser: string;
	analyses: Analysis[];
}

const UserAnalyses: React.FC<Props> = ({ currentUser, analyses }) => {
	if (analyses.length === 0) {
		return <div>No analyses found</div>;
	}

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleString();
	};

	return (
		<div className={styles.userAnalyses}>
			<table className={styles.analysesTable}>
				<thead>
					<tr>
						<th>Text</th>
						<th>Sentiment</th>
						<th>Score</th>
						<th>Magnitude</th>
						<th>Timestamp</th>
						<th>User</th>
					</tr>
				</thead>
				<tbody>
					{analyses.map(analysis => (
						<tr key={analysis.id}>
							<td>{analysis.text}</td>
							<td className={styles[analysis.result.sentiment]}>
								{analysis.result.sentiment}
							</td>
							<td>{analysis.result.score}</td>
							<td>{analysis.result.magnitude}</td>
							<td>{formatTimestamp(analysis.timestamp)}</td>
							<td>{analysis.user}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default memo(UserAnalyses);
