import './App.css';
import React, { useState } from 'react';
import Statistics from './components/Statistics';

//REDUX
import { createStore } from 'redux';
import { reducer } from './store/reducer';

let store = createStore(reducer);
const App = () => {
  const [reduxState, setReduxStore] = useState({});

  // let reduxState = store.getState();
  // Handlers
  const addGoodHandler = () => {
    store.dispatch({
      type: 'ADD_GOOD',
    });
  };
  const addNeutralHandler = () =>
    store.dispatch({
      type: 'ADD_NEUTRAL',
    });
  const addBadHandler = () =>
    store.dispatch({
      type: 'ADD_BAD',
    });

  store.subscribe(() => {
    setReduxStore(store.getState());
  });

  return (
    <div className='App'>
      <div>
        <h3>Give feedback:</h3>
        <button onClick={addGoodHandler}>good</button>
        <button onClick={addNeutralHandler}>neutral</button>
        <button onClick={addBadHandler}>bad</button>
      </div>
      <div>
        <Statistics
          /* good={reduxState.good}
          neutral={reduxState.neutral}
          bad={reduxState.bad} */
          store={reduxState}
        />
      </div>
    </div>
  );
};

export default App;
