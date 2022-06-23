import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import App from './App';
import notificationReducer from './store/reducers/notificationReducer';
import blogReducer from './store/reducers/blogsReducer';

const store = configureStore({
  reducer: { notification: notificationReducer, blogs: blogReducer },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
