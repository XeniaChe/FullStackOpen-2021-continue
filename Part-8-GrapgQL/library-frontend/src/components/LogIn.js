import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

// Queries
import { LOGIN } from '../queries';

const LogIn = ({ show, setToken, setPage }) => {
  if (!show) return null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [logInUser, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log({ error });
    },
  });

  const submit = (e) => {
    e.preventDefault();

    logInUser({ variables: { userName: username, password } });
  };

  useEffect(() => {
    if (data) {
      const token = data.login.value;

      setToken(token);

      localStorage.setItem('token', token);

      setPage('books');
    }
  }, [data]);

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LogIn;
