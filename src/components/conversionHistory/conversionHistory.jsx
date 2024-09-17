import React from 'react';
import styles from './conversionHistory.module.css';

export const ConversionHistory = ({ history }) => {
	return (
		<div className={styles.history}>
			<div className={styles.title}>История ваших конвертаций</div>
			<ul>
				{history.map((historyData, index) => (
					<li key={index}>
						{historyData.date} - {historyData.from} {historyData.sum} →{' '}
						{historyData.to} {historyData.result}
					</li>
				))}
			</ul>
		</div>
	);
};
