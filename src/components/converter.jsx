import React, { useState, useEffect } from 'react';
import styles from './converter.module.css';
import { convertsCurrency } from './utils/convertsCurrency';

export const Converter = () => {
	const [data, setData] = useState({
		conversionFrom: '',
		conversionTo: '',
	});
	const [firstCurrency, setFirstCurrency] = useState('rub');
	const [secondCurrency, setSecondCurrency] = useState('usd');
	const [currenciesCode, setСurrenciesCode] = useState([]);
	const [exchangeRate, setExchangeRate] = useState([]);

	const onChange = (event) => {
		const { name, value } = event.target;

		setData((prevState) => ({
			...prevState,
			[name]: value,
			conversionTo: convertsCurrency(value),
		}));
	};

	const onSelectedFirstCurrency = (event) => {
		setFirstCurrency(event.target.value);
	};

	const onSelectedSecondCurrency = ({ target }) => {
		setSecondCurrency(target.value);
	};

	const changeCurrency = () => {
		setFirstCurrency(secondCurrency);
		setSecondCurrency(firstCurrency);
	};
	useEffect(() => {
		fetch('https://v6.exchangerate-api.com/v6/500eda8129cb286bbd60c0ad/latest/USD')
			.then((response) => response.json())
			.then((data) => {
				const conversionRates = data.conversion_rates;

				Object.keys(conversionRates).forEach((currency) => {
					setСurrenciesCode((prevCurrencies) => [...prevCurrencies, currency]);
					setExchangeRate((prevState) => [
						...prevState,
						conversionRates[currency],
					]);
				});
			})
			.catch((error) => console.error('Ошибка:', error));
	}, []);

	return (
		<>
			<div className={styles.converter}>
				<div className={styles.conversion}>
					<div>
						<span>У меня есть</span>
					</div>
					<div>
						<select value={firstCurrency} onChange={onSelectedFirstCurrency}>
							{currenciesCode.map((currency, index) => (
								<option key={index} value={currency}>
									{currency}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							name="conversionFrom"
							type="number"
							placeholder="Введите сумму"
							value={data.conversionFrom}
							onChange={onChange}
						></input>
					</div>
				</div>
				<div className={styles.change}>
					<button onClick={changeCurrency}>кнопка обмена валютами</button>
				</div>
				<div className={styles.conversion}>
					<div>
						<span>Хочу приобрести</span>
					</div>
					<div>
						<select
							value={secondCurrency}
							onChange={onSelectedSecondCurrency}
						>
							{currenciesCode.map((currency, index) => (
								<option key={index} value={currency}>
									{currency}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							name="conversionTo"
							type="number"
							value={data.conversionTo}
						></input>
					</div>
				</div>
			</div>
			<div className={styles.history}>
				<span>История конвертаций</span>
				<div className={styles.frame}>USD to EUR - 12/09/24 00:00</div>
			</div>
		</>
	);
};
