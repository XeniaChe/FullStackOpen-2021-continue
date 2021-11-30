const initState = { good: 0, neutral: 0, bad: 0 };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_GOOD': {
      const updSate = { ...state, good: state.good + 1 };
      return updSate;
    }

    case 'ADD_NEUTRAL': {
      const updSate = { ...state, neutral: state.neutral + 1 };
      return updSate;
    }

    case 'ADD_BAD': {
      const updSate = { ...state, bad: state.bad + 1 };
      return updSate;
    }
    default:
      return state;
  }
};

export { reducer };
