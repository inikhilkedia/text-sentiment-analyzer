import React, { memo } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
	<div>
		<div className={styles.header}>Text Sentiment Analyzer</div>
		<div className={styles.subheader}>Analyze the sentiment of your text</div>
	</div>
);

export default memo(Header);
