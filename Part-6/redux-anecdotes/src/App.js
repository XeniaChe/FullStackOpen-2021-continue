import React, { useEffect } from 'react';

// Components
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { anecdotesInitAsync } from './store/reducers/anecdoteReducer';

const App = () => {
  const showNotification = useSelector(
    (state) => state.notification.showNotification
  );
  const dispatch = useDispatch();

  // Get initial anecdotes  from server
  useEffect(() => {
    // dispatch ASYNC action
    dispatch(anecdotesInitAsync());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      {showNotification ? <Notification /> : null}
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
