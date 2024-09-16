import React from 'react';
import styles from './conversionResult.module.css';

export const ConversionResult = ({ result }) => {
	return (
		<div className={styles.result}>
			{result !== null ? (
				<input type="number" value={result} readOnly></input>
			) : (
				<input
					type="number"
					placeholder="Введите данные для конвертации"
					readOnly
				></input>
			)}
		</div>
	);
};
