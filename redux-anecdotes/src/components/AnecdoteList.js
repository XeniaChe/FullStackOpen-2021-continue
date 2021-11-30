import React from 'react';
import { connect } from 'react-redux';
import { addVoteAsync } from '../store/reducers/anecdoteReducer';
import { manageNotifAsync } from '../store/reducers/notificationReducer';

const AnecdoteList = (props) => {
  const voteHandler = (id) => {
    const copyAnecdotes = [...props.anecdotes];
    const matchedObject = copyAnecdotes.find((anecdote) => anecdote.id === id);

    props.addVoteAsync(matchedObject);
    props.manageNotifAsync(`You voted for: ${matchedObject.content}`, 2);
  };

  // Sorting by votes number
  const anecdotesCopy = [...props.anecdotes];
  const anecdotesSorted = anecdotesCopy.sort((a, b) => a.votes - b.votes);

  // Filtering
  const filteredAnecdotes = anecdotesSorted.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(props.filterValue.toLowerCase())
  );
  let anecdotesList = props.filterValue ? filteredAnecdotes : anecdotesSorted;

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

const mapPropsToState = (state) => {
  return {
    anecdotes: state.anecdotes,
    filterValue: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVoteAsync: (matchObj) => {
      dispatch(addVoteAsync(matchObj));
    },
    manageNotifAsync: (content, sec) => {
      dispatch(manageNotifAsync(content, sec));
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(AnecdoteList);
