import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NEW_BOOK, GET_ALL_BOOKS, GET_ALL_AUTHORS } from '../queries';

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // TODO:
  // optimaze updating the cache
  const [createNedwBookHandler, { data, error }] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [{ query: GET_ALL_AUTHORS } /* { query: GET_ALL_BOOKS } */],
    update: (cache, response) => {
      // Can NOT update 2 fileds (2 query results)
      cache.updateQuery({ query: GET_ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: allBooks.concat(response.data.addBook),
      }));
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createNedwBookHandler({
      variables: { title, author, published, genres },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  if (data) setPage('authors'); // GO back to 'books' page
  if (error) return <p>{error.message}</p>;

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
