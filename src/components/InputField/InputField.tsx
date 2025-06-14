import React, { memo, KeyboardEvent, ChangeEvent } from 'react';
import styles from './InputField.module.css';
import { ArrowUp } from 'react-feather';

interface Props {
	userInput: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}

const InputField: React.FC<Props> = ({
	userInput,
	handleInputChange,
	handleSubmit,
}) => {
	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && userInput) {
			handleSubmit();
		}
	};

	return (
		<div className={styles.inputContainer}>
			<input
				className={styles.input}
				value={userInput}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				placeholder='Enter text here...'
			/>
			<button
				onClick={handleSubmit}
				className={`${styles.iconButton} ${userInput ? styles.active : ''}`}
				disabled={!userInput}
			>
				<ArrowUp size={16} />
			</button>
		</div>
	);
};

export default memo(InputField);
