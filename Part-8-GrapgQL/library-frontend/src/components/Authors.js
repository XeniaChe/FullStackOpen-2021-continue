import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Select from 'react-select';

// Queries
import { EDIT_AUTHOR_BIRTH } from '../queries';

const Authors = ({ show, authors }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <EditAuthorBirth authors={authors} />
      </div>
    </div>
  );
};

export default Authors;

const EditAuthorBirth = ({ authors }) => {
  const [bornYear, setBornYear] = useState('');
  // Select
  const [selectedAuthor, setSelectedAuthor] = useState('');

  // Mutation
  const [updAuthor] = useMutation(EDIT_AUTHOR_BIRTH);

  const authorsOpt = authors.map((a) => ({ value: a.name, label: a.name }));

  const submit = () => {
    updAuthor({ variables: { name: selectedAuthor.value, born: +bornYear } });

    setSelectedAuthor('');
    setBornYear('');
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>Set Bornhyear</div>

        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={authorsOpt}
        />
        <div>
          born
          <input
            type='number'
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </>
  );
};
