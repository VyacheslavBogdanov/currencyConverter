import React, { useReducer } from 'react';
import styles from './App.module.css';
import { ConversionHistory } from './components/conversionHistory/conversionHistory';
import { ConversionResult } from './components/conversionResult/conversionResult';
import { Converter } from './components/converter/converter';

const initialState = {
	history: [],
	result: null,
	error: null,
};

const reducer = (state, effect) => {
	switch (effect.type) {
		case 'RESULT':
			return { ...state, result: effect.result, error: null };
		case 'ERROR':
			return { ...state, error: effect.error };
		case 'HISTORY':
			return { ...state, history: [effect.history, ...state.history].slice(0, 5) };
		default:
			return state;
	}
};

export const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const makeConversion = (from, to, sum) => {
		fetch(`http://localhost:3007/conversion_rates`)
			.then((response) => response.json())
			.then((data) => {
				const result = (data[to] / data[from]) * sum;
				dispatch({ type: 'RESULT', result });
				const history = {
					date: new Date().toLocaleString(),
					from,
					to,
					sum,
					result,
				};
				dispatch({ type: 'HISTORY', history });
			})
			.catch((error) => {
				dispatch({
					type: 'ERROR',
					error: 'Ошибка сервера.',
				});
			});
	};

	return (
		<div className={styles.app}>
			<Converter onConverting={makeConversion} />
			<ConversionResult result={state.result} />
			<ConversionHistory history={state.history} />
		</div>
	);
};
