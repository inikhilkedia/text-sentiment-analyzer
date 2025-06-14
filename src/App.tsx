import React, { useCallback, lazy, Suspense, ChangeEvent } from 'react';
import styles from './App.module.css';
import { useTextAnalyzer } from './hooks/useTextAnalyzer';
import { Analysis } from './types';

// Define types for our state
interface AnalysisResult {
	sentiment: string;
	score: number;
	magnitude: number;
}

const Header = lazy(() => import('./components/Header/Header'));
const UserDropdown = lazy(
	() => import('./components/UserDropdown/UserDropdown')
);
const InputField = lazy(() => import('./components/InputField/InputField'));
const ResultDisplay = lazy(
	() => import('./components/ResultDisplay/ResultDisplay')
);
const UserAnalyses = lazy(
	() => import('./components/UserAnalyses/UserAnalyses')
);

const App: React.FC = () => {
	const {
		state,
		setUserInput,
		setAnalysisResult,
		setCurrentUser,
		addAnalysis,
		resetAnalysisResult,
	} = useTextAnalyzer();

	const handleInputChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const text = e.target.value;
			setUserInput(text);

			if (text) {
				try {
					const response = await fetch('http://localhost:3002/api/analyze', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ text }),
					});

					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					const data = await response.json();
					setAnalysisResult(data.result);
				} catch (error) {
					console.error('Error analyzing text:', error);
					setAnalysisResult(null);
				}
			} else {
				resetAnalysisResult();
			}
		},
		[setUserInput, setAnalysisResult, resetAnalysisResult]
	);

	const handleSubmit = useCallback(async () => {
		if (!state.userInput || !state.analysisResult) return;

		try {
			const response = await fetch('http://localhost:3002/api/save-analysis', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: state.currentUser,
					text: state.userInput,
					result: state.analysisResult,
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			if (data.success) {
				addAnalysis();
				setUserInput(''); // Clear the input after submission
			}
		} catch (error) {
			console.error('Error saving analysis data:', error);
		}
	}, [
		state.userInput,
		state.analysisResult,
		state.currentUser,
		addAnalysis,
		setUserInput,
	]);

	const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCurrentUser(e.target.value);
	};

	return (
		<div className={styles.container}>
			<Suspense fallback={<div>Loading...</div>}>
				<UserDropdown
					currentUser={state.currentUser}
					handleUserChange={handleUserChange}
				/>
				<div className={styles.mainContent}>
					<Header />
					<InputField
						userInput={state.userInput}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
					/>
					<ResultDisplay analysisResult={state.analysisResult} />
				</div>
				<UserAnalyses
					currentUser={state.currentUser}
					analyses={state.analyses[state.currentUser] || []}
				/>
			</Suspense>
		</div>
	);
};

export default App;
