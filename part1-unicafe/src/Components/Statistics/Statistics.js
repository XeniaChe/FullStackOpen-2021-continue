import React from 'react';
import Statistic from './statistic/statistic';
import * as styles from './Statistics.module.scss';

const Statistics = ({ good, neutral, bad }) => {
	let total = good + neutral + bad;
	let avarage, positive;
	if (total > 0) {
		avarage = (good - bad) / total;
		positive = good / total * 100;
	} else {
		avarage = 0;
		positive = 0;
	};
	
	let statistics = null;

	if (good === 0 && neutral === 0 && bad === 0) {
		statistics = <h2>No feedback given</h2>;
	} else {
		statistics = (
            <>
			 	<h2>Statistics:</h2>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Feedback</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
					<tr>
						<Statistic text='Good: ' value={good}/>
					</tr>
					<tr>
						<Statistic text='Neutral: ' value={neutral}/>
					</tr>
					<tr>
						<Statistic text='Bad: ' value={bad}/>
					</tr>
					<tr>
						<Statistic text='Total: ' value={total}/>
					</tr>
					<tr>
						<Statistic text='Avarage: ' value={avarage}/>
					</tr>
					<tr>
						<Statistic text='Positive: ' value={positive}/>
					</tr>
					</tbody>
				</table>
            </>
			
		);
	}
	return <>{statistics}</>;
};

export default Statistics;
