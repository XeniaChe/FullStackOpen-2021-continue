import React from 'react';
import StatisticLine from './StatisticLine';
import { Connect } from 'react-redux';

const Statistics = (/* { good, neutral, bad } */ { store }) => {
  const { good, neutral, bad } = store;

  console.log('GOOD from Statictics', good);
  const allScore = good - bad;
  const allVotes = good + neutral + bad;
  const avarageScore = allScore / allVotes || 0;
  const positiveScore = (good / allVotes) * 100 || 0;

  const tableClass = {
    display: 'block',
    console: 'red',
  };

  const display =
    good || neutral || bad ? (
      <table className={tableClass}>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={allVotes} />
          <StatisticLine text='Avarage' value={avarageScore} />
          <StatisticLine text='Positive' value={`${positiveScore}%`} />
        </tbody>
      </table>
    ) : (
      <p>No feedback yet</p>
    );

  return (
    <>
      <h3>Statistics:</h3>
      {display}
    </>
  );
};
export default Connect()(Statistics);
