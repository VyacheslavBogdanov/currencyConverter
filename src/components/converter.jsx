import { useState, useEffect } from 'react';
import styles from './converter.module.css';

export const Converter = () => {
	const [firstCurrency, setFirstCurrency] = useState('rub');
	const [secondCurrency, setSecondCurrency] = useState('usd');
	// const [currency, setCurrency] = useState([]);

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
	// useEffect(() => {
	// 	fetch('https://jsonplaceholder.typicode.com/posts')
	// 		.then((data) => data.json())
	// 		.then((cur) => {
	// 			setCurrency(cur);
	// 		});
	// }, []);

	return (
		<>
			<div className={styles.converter}>
				<div className={styles.conversion}>
					<div>
						<span>У меня есть</span>
					</div>
					<div>
						<select value={firstCurrency} onChange={onSelectedFirstCurrency}>
							<option value="usd">USD</option>
							<option value="eur">EUR</option>
							<option value="rub">RUB</option>
						</select>
					</div>
					<div>
						<input type="text"></input>
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
							<option value="usd">USD</option>
							<option value="eur">EUR</option>
							<option value="rub">RUB</option>
						</select>
					</div>
					<div>
						<input type="text"></input>
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
