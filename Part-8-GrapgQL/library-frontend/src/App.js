import React, { useState, useEffect, useContext } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

import { useQuery } from '@apollo/client';
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from './queries';

// import { Context } from './context/context';

const App = () => {
  const [page, setPage] = useState('authors');

  let authors = [];
  const { data } = useQuery(GET_ALL_AUTHORS);
  if (data) {
    authors = data.allAuthors;
  }

  let books = [];
  const { data: booksData } = useQuery(GET_ALL_BOOKS);
  if (booksData) {
    books = booksData.allBooks;
  }

  useEffect(() => {
    console.log(`books updated: `);
  }, [books]);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
