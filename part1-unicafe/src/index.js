import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Statistics from './Components/Statistics/Statistics';
import Button from './Components/button/Button';

const App = () => {
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);

	const goodClickHandler = () => setGood(good + 1);
	const neutralClickHandler = () => setNeutral(neutral + 1);
	const badClickHandler = () => setBad(bad + 1);

	return (
		<div>
			<h1> Leave your feedback</h1>
			<Button click={goodClickHandler} text='Good' />
			<Button click={neutralClickHandler} text='Neutral' />
			<Button click={badClickHandler} text='Bad' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
