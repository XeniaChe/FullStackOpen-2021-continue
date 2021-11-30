// Services AXIOS
import anecdoteSrv from '../../services/anecdotes';

/////////////////////////////// Action Creators
const addVote = (matchedAnecdote) => ({
  type: 'ANECDOTES/ADD_VOTE',
  matchedAnecdote,
});

const addNewAnecdote = (data) => ({
  type: 'ANECDOTES/ADD_NEW_ANECDOTE',
  data,
});

const anecdotesInit = (data) => ({
  type: 'ANECDOTES/GET_INITIAL_NOTES',
  payload: { data },
});

/////////////////////////////// ASYNC action with Redux THUNK
export const anecdotesInitAsync = () => {
  return async (dispatch) => {
    // ASYNC action first
    const anecdotes = await anecdoteSrv.getAll();

    // Dispatch an actual SYNC action
    dispatch(anecdotesInit(anecdotes));
  };
};

export const addNewAnecdoteAsync = (content) => {
  const anecdoteData = { content, votes: 0 };

  return async (dispatch) => {
    // ASYNC action first
    const newAnecdote = await anecdoteSrv.addNew(anecdoteData);

    // Dispatch an actual SYNC action
    dispatch(addNewAnecdote(newAnecdote));
  };
};

export const addVoteAsync = (matchedAnecdote) => {
  const updatedAnecdote = {
    ...matchedAnecdote,
    votes: ++matchedAnecdote.votes,
  };

  return async (dispatch) => {
    // ASYNC action first
    const updatedRes = await anecdoteSrv.addVotes(
      matchedAnecdote.id,
      updatedAnecdote
    );

    // Dispatch an actual SYNC action
    dispatch(addVote(updatedRes));
  };
};

/////////////////////////////// REDUSER
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANECDOTES/GET_INITIAL_NOTES': {
      return [...action.payload.data];
    }

    case 'ANECDOTES/ADD_VOTE': {
      return state.map((anecdote) =>
        anecdote.id === action.matchedAnecdote.id
          ? action.matchedAnecdote
          : anecdote
      );
    }

    case 'ANECDOTES/ADD_NEW_ANECDOTE':
      return [...state, action.data];

    default:
      return state;
  }
};

export default reducer;
