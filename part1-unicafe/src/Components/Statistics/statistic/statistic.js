import React from 'react';

const Statistic = ({ text, value }) => (
	<>
		<td className='first'>
			{text}
		</td>
		<td>
			{value}
		</td>
	</>
);

export default Statistic;

