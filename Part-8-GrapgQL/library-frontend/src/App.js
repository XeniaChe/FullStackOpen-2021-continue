import React, { useState, useEffect, useContext } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LogIn from './components/LogIn';
import Recommended from './components/REcommendation';

// Queries
import { useQuery } from '@apollo/client';
import { GET_ALL_AUTHORS, GET_ALL_BOOKS, NEW_BOOK_SUBSCRIBE } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenStored = localStorage.getItem('token');

    if (tokenStored) setToken(tokenStored);
  }, []);

  let authors = [];
  const { data } = useQuery(GET_ALL_AUTHORS);
  if (data) {
    authors = data.allAuthors;
  }

  let books = [];
  const { data: booksData, subscribeToMore } = useQuery(GET_ALL_BOOKS); // subscribeToMore will be called in Books.js
  const callSubscribeToMore = () => {
    subscribeToMore({
      document: NEW_BOOK_SUBSCRIBE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newBook = subscriptionData.data.bookAdded;

        return Object.assign({}, prev, {
          allBooks: [...prev.allBooks, newBook],
        });
      },
    });
  };

  if (booksData) {
    books = booksData.allBooks;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('logOut')}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage('logIn')}>log in</button>
        )}
      </div>
      <Authors show={page === 'authors'} authors={authors} />

      <Books
        show={page === 'books'}
        books={books}
        callSubscribeToMore={callSubscribeToMore}
      />

      <NewBook show={page === 'add'} setPage={setPage} />

      <Recommended show={page === 'recommended'} books={books} />

      <LogIn show={page === 'logIn'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
