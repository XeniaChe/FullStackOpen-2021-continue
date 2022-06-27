import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/login';
import {
  errorNotification,
  succesNotification,
  clearNotif,
} from './notificationReducer';

import { setToken } from './blogsReducer';

export const setExistingUser = (data) => ({
  type: 'USER/USE_EXISTING',
  payload: data,
});

const loginUser = (data) => ({
  type: 'USER/LOGIN',
  payload: data,
});

export const userLogOut = () => ({
  type: 'USER/LOGOUT',
});

export const setUserCredentials = (data) => ({
  type: 'USER/SET_CREDENTIALS',
  payload: data,
});

export const useExistingUser = (user) => {
  return (dispatch) => {
    dispatch(setExistingUser(user));
    setToken(user.token);
  };
};

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = (await axios.post(baseUrl, credentials)).data;
      setToken(user.token);

      //save logged-in user to localStorage
      window.localStorage.setItem(
        'loggedInUserJson',
        `${JSON.stringify(user)}`
      );

      dispatch(loginUser(user));
      dispatch(succesNotification(`${user.name} logged-in`));
    } catch (error) {
      console.log(error);
      dispatch(errorNotification(`Login failed: ${error.message}`));
    }
    dispatch(clearNotif());
  };
};

/// Reducer
const initState = {
  userName: '',
  password: '',
  user: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER/USE_EXISTING': {
      return { ...state, user: action.payload };
    }
    case 'USER/SET_CREDENTIALS': {
      return action.payload.type === 'name'
        ? { ...state, userName: action.payload.value }
        : { ...state, password: action.payload.value };
    }
    case 'USER/LOGIN': {
      return { ...state, user: action.payload };
    }
    case 'USER/LOGOUT': {
      return { ...state, user: null };
    }

    default:
      return state;
  }
};

export default reducer;
