import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

// Query
import { GET_FILTERED_BOOKS } from '../queries';

const Books = ({ books, show }) => {
  const [filter, setFilter] = useState('');

  const { data } = useQuery(GET_FILTERED_BOOKS, {
    variables: { filter },
    // Delayed query call
    skip: !filter, // if true - do NOT call the query
  });

  if (!show) {
    return null;
  }

  const genresAll = books.reduce((acc, curVal) => {
    acc.push(...curVal.genres);

    return acc;
  }, []);

  const genresUnique = [...new Set(genresAll)];
  const genresBar = genresUnique.map((genre) => (
    <button key={genre} onClick={() => setFilter(genre)}>
      {genre}
    </button>
  ));

  if (data) books = data.filteredBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          {filter ? (
            <p>
              {' '}
              in genre <strong>{filter}</strong>{' '}
            </p>
          ) : null}
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresBar}
    </div>
  );
};

export default Books;
