import React from 'react';
import { addNewAnecdoteAsync } from '../store/reducers/anecdoteReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
  const addNewAnecdoteHandler = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    // dispatch ASYNC action
    props.addNewAnecdoteAsync(content);
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

const mapDispatchToProps = (dispatch) => ({
  addNewAnecdoteAsync: (content) => dispatch(addNewAnecdoteAsync(content)),
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);
