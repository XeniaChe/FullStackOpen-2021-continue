import React from 'react';
import { addNewAnecdoteAsync } from '../store/reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdoteHandler = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    // dispatch ASYNC action
    dispatch(addNewAnecdoteAsync(content));
  };

  return (
    <>
      <form onSubmit={addNewAnecdoteHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
