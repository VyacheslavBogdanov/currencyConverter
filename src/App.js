import React, { useReducer } from 'react';
import styles from './App.module.css';
import { ConversionHistory } from './components/conversionHistory/conversionHistory';
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
		fetch(`http://localhost:3005/conversion_rates`)
			.then((response) => response.json())
			.then((data) => {
				const result = ((data[to] / data[from]) * sum).toFixed(3);
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
					error: 'Ошибка сервера. Не удалось получить данные курсов валют.',
				});
			});
	};

	return (
		<div className={styles.app}>
			<Converter onConverting={makeConversion} result={state.result} />
			{state.error && <div className={styles.error}>{state.error}</div>}
			<ConversionHistory history={state.history} />
		</div>
	);
};
