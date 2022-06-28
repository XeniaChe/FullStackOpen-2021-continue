import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import App from './App';
import notificationReducer from './store/reducers/notificationReducer';
import blogReducer from './store/reducers/blogsReducer';
import userReducer from './store/reducers/userDataReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
