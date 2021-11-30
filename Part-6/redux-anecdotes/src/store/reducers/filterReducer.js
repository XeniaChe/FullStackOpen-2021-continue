///////Action Creators
export const setFilter = (value) => ({
  type: 'SET_FILTER_VALUE',
  payload: { value },
});

///////REDUSER
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return action.payload.value;

    default:
      return state;
  }
};

export default filterReducer;
