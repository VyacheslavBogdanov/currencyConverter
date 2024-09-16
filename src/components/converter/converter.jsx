import React, { useState, useEffect } from 'react';
import styles from './converter.module.css';
import { convertsCurrency } from '../utils/convertsCurrency';

export const Converter = () => {
	const [data, setData] = useState({
		conversionFrom: '',
		conversionTo: '',
	});
	const [firstCurrency, setFirstCurrency] = useState('RUB');
	const [secondCurrency, setSecondCurrency] = useState('USD');
	const [currenciesCode, setСurrenciesCode] = useState([]);
	// const [exchangeRate, setExchangeRate] = useState([]);
	const [conversionRates, setConversionRates] = useState({});
	// const [conversion, setConversion] = useState({});

	const onChange = (event) => {
		const { name, value } = event.target;
		console.log('name', name);
		console.log('value', value);

		setData((prevState) => ({
			...prevState,
			[name]: value,
			conversionTo: convertsCurrency(
				value,
				conversionRates[firstCurrency],
				conversionRates[secondCurrency],
			),
		}));
	};

	// const onBlur = () => {
	// 	console.log('ВЫ УБРАЛИ ФОКУС С ИНПУТА, ИСТОРИЯ ЗАПИСАНА');
	// };

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
		fetch('http://localhost:3005/conversion_rates')
			.then((response) => response.json())
			.then((data) => {
				// const rates = data.conversion_rates; //Task
				const rates = data; //TEST
				setConversionRates(rates);

				Object.keys(rates).forEach((currency) => {
					setСurrenciesCode((prevState) => [...prevState, currency]);
					// setExchangeRate((prevState) => [
					// 	...prevState,
					// 	conversionRates[currency],
					// ]);
					// setConversion({ currency: conversionRates[currency] });
				});
			})
			.catch((error) => console.error('Ошибка:', error));
	}, []);

	return (
		<div className={styles.converter}>
			<div className={styles.conversion}>
				<h1>У меня есть</h1>
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
						onBlur={onChange}
					></input>
				</div>
			</div>
			<div className={styles.change}>
				<div className={styles.changeArrow} onClick={changeCurrency}></div>
			</div>
			<div className={styles.conversion}>
				<h1>Хочу приобрести</h1>
				<div>
					<select value={secondCurrency} onChange={onSelectedSecondCurrency}>
						{currenciesCode.map((currency, index) => (
							<option key={index} value={currency}>
								{currency}
							</option>
						))}
					</select>
				</div>
				<div>
					{/* <input
						name="conversionTo"
						type="number"
						value={data.conversionTo}
					></input> */}
				</div>
				<button>Конвертировать</button>
			</div>
		</div>
	);
};
