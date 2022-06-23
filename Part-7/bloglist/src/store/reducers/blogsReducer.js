/// Action Types
import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/blogs';

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
      // NOT CATCHING RESPONSE.ERROR send by server!!!
      // result is always missing in this case
      // Tryied: 1. axios.interceptors
      // 2. throwing error in catch block
      // 3. dispatching action for setting errorMsg in state and pass to component for rendering.
      // the errorMsg was not set at the expected time
      const result = await axios.post(baseUrl, blog, config);
      dispatch(createNewBlog(result.data));
    } catch (error) {
      console.log({ error });
    }
  };
};

/// Reducer
const initState = { blogs: [], blogAdded: {} };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'BLOGS/GET_ALL': {
      return { ...state, blogs: [...state.blogs, ...action.payload] };
    }
    case 'BLOGS/ADD_NEW': {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        blogAdded: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
