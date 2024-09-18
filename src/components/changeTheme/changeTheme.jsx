import React, { useState } from 'react';

export const ChangeTheme = () => {
	const [theme, setTheme] = useState(false);

	return (
		<div className="theme">
			<div className="title" onClick={() => setTheme(!theme)}>
				изменить фон
			</div>
			<style jsx global>{`
				body {
					background-color: ${theme ? '#212121' : '#e8e8e8'};
				}
				.title {
					color: ${theme ? '#e8e8e8' : '#212121'};
				}
			`}</style>
		</div>
	);
};
