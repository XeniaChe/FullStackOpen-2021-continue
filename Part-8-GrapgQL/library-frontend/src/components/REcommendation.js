import { useQuery } from '@apollo/client';
import React from 'react';

// Query
import { GET_ME } from '../queries';

const Recommendation = ({ show, books }) => {
  if (!show) return null;

  const { data, error, loading } = useQuery(GET_ME);
  let filter;
  let content = null;

  const bookAlternative = null;

  if (error) return <p>something went wrong</p>;
  if (loading) return <p>loading ...</p>;

  const getFilteredBooks = (filter) =>
    books.filter((book) => book.genres.includes(filter));
  if (data) {
    filter = data.me.favouriteGenre;
    const filterdBooks = getFilteredBooks(filter);

    content = (
      <>
        <p>
          books in your favorite genre <strong>{filter}</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filterdBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div>
      <h3>recommendation</h3>
      {content}
    </div>
  );
};

export default Recommendation;
