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

const changeLikesCount = (res) => ({
  type: 'BLOGS/CHANGE_LIKES_COUNT',
  payload: res,
});

const deleteBlogAction = (id) => ({
  type: 'BLOGS/DELETE_BLOG',
  payload: id,
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

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    console.log({ id });
    const blogReturned = (await axios.put(`${baseUrl}/${id}`, updatedBlog))
      .data;

    dispatch(changeLikesCount({ id, blogReturned }));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      //get blog's id
      const id = blog.id;
      console.log(`blogs id to delete: ${id}`);

      //get delete confirmation
      const deleteConfirm = window.confirm(`Delete ${blog.title} ?`);

      if (deleteConfirm) {
        //sending TOKEN in request after user loged-in
        const config = {
          headers: { Authorization: null },
        };

        await axios.delete(`${baseUrl}/${id}`, config);

        dispatch(deleteBlogAction(id));
        dispatch(succesNotification(`blog: ${blog.title} deleted`));
      }
    } catch (error) {
      console.error(error);
      dispatch(errorNotification(`Something went wrong`));
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
    case 'BLOGS/CHANGE_LIKES_COUNT': {
      const newCount = action.payload.blogReturned.likes;
      const blogsUpdated = state.map((blog) =>
        blog.id === action.payload.id ? { ...blog, likes: newCount } : blog
      );
      return [...blogsUpdated];
    }
    case 'BLOGS/DELETE_BLOG': {
      const updatedBlogs = state.filter((blog) => blog.id !== action.payload);
      return [...updatedBlogs];
    }

    default:
      return state;
  }
};

export default reducer;
