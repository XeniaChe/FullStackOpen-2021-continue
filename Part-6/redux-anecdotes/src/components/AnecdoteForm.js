import React from 'react';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdoteHandler = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    dispatch(addNewAnecdote(content));
    console.log('NEW Anecdote created');
    event.target.anecdote.value = '';
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
