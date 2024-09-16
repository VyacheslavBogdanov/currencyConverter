import React, { useState, useEffect } from 'react';
import styles from './converter.module.css';

export const Converter = ({ onConverting }) => {
	const [currencyFrom, setCurrencyFrom] = useState('USD');
	const [currencyTo, setCurrencyTo] = useState('RUB');
	const [sum, setSum] = useState(1);
	const [currenciesCode, setСurrenciesCode] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3007/conversion_rates')
			.then((response) => response.json())
			.then((data) => setСurrenciesCode(Object.keys(data)));
	}, []);

	return (
		<div className={styles.converter}>
			<div className={styles.conversion}>
				<h1>У меня есть</h1>
				<div>
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
				<div>
					<input
						type="number"
						value={sum}
						onChange={(event) => setSum(event.target.value)}
					></input>
				</div>
			</div>
			<div className={styles.change}>
				<div
					className={styles.changeArrow}
					onClick={() => {
						setCurrencyFrom(currencyTo);
						setCurrencyTo(currencyFrom);
					}}
				></div>
			</div>
			<div className={styles.conversion}>
				<h1>Хочу приобрести</h1>
				<div>
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
			</div>
			<button onClick={() => onConverting(currencyFrom, currencyTo, sum)}>
				Конвертировать
			</button>
		</div>
	);
};
