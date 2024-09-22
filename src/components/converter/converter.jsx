import React, { useState, useEffect } from 'react';
import styles from './converter.module.css';
import { ConversionResult } from '../conversionResult/conversionResult';

export const Converter = ({ onConverting, result }) => {
	const [currencyFrom, setCurrencyFrom] = useState('USD');
	const [currencyTo, setCurrencyTo] = useState('RUB');
	const [sum, setSum] = useState(100);
	const [currenciesCode, setСurrenciesCode] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://v6.exchangerate-api.com/v6/500eda8129cb286bbd60c0ad/latest/USD')
			.then((response) => response.json())
			.then((data) => setСurrenciesCode(Object.keys(data.conversion_rates)))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.converter}>
			{isLoading && <div className={styles.loader}></div>}
			<div className={styles.conversion}>
				<div className={styles.title}>У меня есть</div>
				<div className={styles.select}>
					<select
						value={currencyFrom}
						onChange={(event) => setCurrencyFrom(event.target.value)}
					>
						{currenciesCode.map((code, index) => (
							<option key={index} value={code}>
								{code}
							</option>
						))}
					</select>
				</div>
				<div className={styles.amount}>
					<input
						type="number"
						value={sum}
						onChange={(event) => setSum(event.target.value)}
					></input>
				</div>
			</div>
			<div className={styles.buttons}>
				<div
					className={styles.changeArrow}
					onClick={() => {
						setCurrencyFrom(currencyTo);
						setCurrencyTo(currencyFrom);
					}}
				></div>

				<button onClick={() => onConverting(currencyFrom, currencyTo, sum)}>
					Конвертировать
				</button>
			</div>

			<div className={styles.conversion}>
				<div className={styles.title}>Хочу приобрести</div>
				<div className={styles.select}>
					<select
						value={currencyTo}
						onChange={(event) => setCurrencyTo(event.target.value)}
					>
						{currenciesCode.map((code, index) => (
							<option key={index} value={code}>
								{code}
							</option>
						))}
					</select>
				</div>
				<ConversionResult result={result} />
			</div>
		</div>
	);
};
