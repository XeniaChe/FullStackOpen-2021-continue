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
/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]; 


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
const getId = () => (100000 * Math.random()).toFixed(0);
*/
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANECDOTES/GET_INITIAL_NOTES': {
      return [...action.payload.data];
    }

    case 'ANECDOTES/ADD_VOTE': {
      /*  
      const copyState = [...state];
      const matchedObject = copyState.find(
        (anecdote) => anecdote.id === action.id
        );
        const anecdoteToUpdate = {
          ...matchedObject,
          votes: ++matchedObject.votes,
        };
      */

      /*  const anecdoteToUpdate = {
        ...action.matchedAnecdote,
        votes: ++action.matchedAnecdote.votes,
      }; */

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
