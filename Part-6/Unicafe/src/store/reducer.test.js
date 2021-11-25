import { reducer } from './reducer';
import deepFreeze from 'deep-freeze';

describe('testinf REDUX', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  test('add GOOD score', () => {
    const state = initialState;
    const action = { type: 'ADD_GOOD' };

    deepFreeze(state);
    const updatedState = reducer(state, action);

    expect(updatedState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0,
    });
  });

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    deepFreeze(reducer);
    const updatedState = reducer(undefined, action);

    expect(updatedState).toEqual(initialState);
  });
});
