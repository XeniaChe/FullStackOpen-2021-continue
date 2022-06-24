/// Action Types
import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/blogs';
import {
  errorNotification,
  succesNotification,
  clearNotif,
} from './notificationReducer';

const getAllBlogs = (res) => ({
  type: 'BLOGS/GET_ALL',
  payload: res,
});

export const getInitBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await axios.get(baseUrl);
      const sortedBlogs = blogs.data.sort((a, b) => b.likes - a.likes);

      dispatch(getAllBlogs(sortedBlogs));
    } catch (error) {
      console.log(error.message);
    }
  };
};

const createNewBlog = (res) => ({
  type: 'BLOGS/ADD_NEW',
  payload: res,
});

let token = null;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const sendNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      //sending TOKEN in request after user loged-in
      const config = {
        headers: { Authorization: token },
      };
      const blogAdded = (await axios.post(baseUrl, blog, config)).data;
      dispatch(createNewBlog(blogAdded));
      dispatch(
        // Dispatch IMPORTED successNotif action
        succesNotification(
          `A new blog: ${blogAdded.title}  by ${blogAdded.author} added.`
        )
      );
    } catch (error) {
      // Dispatch IMPORTED errorNotif action
      // Here you'd need to seaparate diff handling strategies
      // for different types (from server/ errors caused by FE in try block ) of errors
      dispatch(errorNotification(error.message));
    }
    dispatch(clearNotif());
  };
};

/// Reducer
const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'BLOGS/GET_ALL': {
      return [...state, ...action.payload];
    }
    case 'BLOGS/ADD_NEW': {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

export default reducer;
