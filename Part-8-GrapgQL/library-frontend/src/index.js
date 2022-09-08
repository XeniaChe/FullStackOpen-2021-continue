import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// Subscription
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { getMainDefinition } from '@apollo/client/utilities';

// Add authorization header with token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: { ...headers, authorization: token ? `bearer ${token}` : null },
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
});

// WebSocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4001/graphql',
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
