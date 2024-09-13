import styles from './App.module.css';
import { Converter } from './components/converter';

export const App = () => {
	return (
		<div className={styles.App}>
			<Converter />
		</div>
	);
};
