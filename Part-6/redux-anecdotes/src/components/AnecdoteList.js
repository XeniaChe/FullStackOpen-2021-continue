import React /* , { useEffect }  */ from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVoteAsync } from '../store/reducers/anecdoteReducer';
import { manageNotifAsync } from '../store/reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const voteHandler = (id) => {
    const copyAnecdotes = [...anecdotes];
    const matchedObject = copyAnecdotes.find((anecdote) => anecdote.id === id);

    dispatch(addVoteAsync(matchedObject));
    dispatch(manageNotifAsync(`You voted for: ${matchedObject.content}`, 2));
  };

  // Sorting by votes number
  const anecdotesCopy = [...anecdotes];
  const anecdotesSorted = anecdotesCopy.sort((a, b) => a.votes - b.votes);

  // Filtering
  const filteredAnecdotes = anecdotesSorted.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
  );
  let anecdotesList = filterValue ? filteredAnecdotes : anecdotesSorted;

  /* useEffect(() => {
    console.log('Show NOTIFICATION from USEEFFECT');
    if (filterValue && !filteredAnecdotes.length) {
      const message = 'There is no matching items in the list';
      dispatch(manageNotifAsync(message, 3));
    }
  }, [filterValue, dispatch, filteredAnecdotes]); */

  return (
    <>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
