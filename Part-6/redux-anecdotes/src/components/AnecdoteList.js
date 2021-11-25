import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const anecdotesCopy = [...anecdotes];
  const anecdotesSorted = anecdotesCopy.sort((a, b) => a.votes - b.votes);

  const dispatch = useDispatch();

  const voteHandler = (id) => dispatch(addVote(id));
  return (
    <>
      {anecdotesSorted.map((anecdote) => (
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
