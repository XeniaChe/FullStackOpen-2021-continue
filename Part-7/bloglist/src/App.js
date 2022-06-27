import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Services

// Components
import './App.css';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Toogable from './components/Toogable';
import { getInitBlogs, sendNewBlog } from './store/reducers/blogsReducer';
import {
  setUserCredentials,
  useExistingUser,
  userLogin,
  userLogOut,
} from './store/reducers/userDataReducer';

const App = () => {
  // Redux
  const dispatch = useDispatch();
  const { user, userName, password } = useSelector((state) => state.users);
  const { showNotifSuccess, successMessage, errorMessage, showNotifError } =
    useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  //useRef to use here the method declared inside <Toogable/>
  const toogableRef = useRef();

  useEffect(() => {
    dispatch(getInitBlogs());
  }, []);

  //checking if user has alredy been logged-in
  useEffect(() => {
    //get logged-in user to localStorage
    let loggedUserJson = window.localStorage.getItem('loggedInUserJson');

    if (loggedUserJson) {
      //parse back stringified user to JS object
      let user = JSON.parse(loggedUserJson);
      dispatch(useExistingUser(user));
    }
  }, []);

  const notifSuccses = (message) => {
    return (
      <div className='Success'>
        <h2>{message}</h2>
      </div>
    );
  };

  const notifError = (errorMessage) => {
    return (
      <div className='Err'>
        <h2>{errorMessage}</h2>
      </div>
    );
  };

  const logInHandler = async (event) => {
    event.preventDefault();
    dispatch(userLogin({ userName, password }));
  };

  //LogOut and remove user and TOKEN from localStorage
  const logOutHandler = () => {
    window.localStorage.removeItem('loggedInUserJson');
    dispatch(userLogOut());
  };

  const sendNewBlogHandler = (blog) => {
    dispatch(sendNewBlog(blog));
    //invoke the method for toogling visibility declared in <Toogable/>
    toogableRef.current.toogleVisibility();
  };

  const setUserCredentialsHandler = (type, value) => {
    dispatch(setUserCredentials({ type, value }));
  };

  const showLoginForm = () => (
    <div>
      <h2> Log-in into application</h2>
      <form onSubmit={logInHandler}>
        <label htmlFor='userName'>User name:</label>
        <input
          id='userName'
          type='text'
          name='name'
          onInput={({ target }) => {
            setUserCredentialsHandler('name', target.value);
          }}
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          name='password'
          onInput={({ target }) => {
            setUserCredentialsHandler('password', target.value);
          }}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );

  const showBlogs = () => (
    <div>
      {' '}
      <h4>{user.username} is logged-in</h4>
      <button onClick={logOutHandler}>log out</button>
      <Toogable ref={toogableRef}>
        <BlogForm sendBlog={sendNewBlogHandler} />
      </Toogable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {showNotifSuccess && notifSuccses(successMessage)}
      {showNotifError && notifError(errorMessage)}
      {user === null ? showLoginForm() : showBlogs()}
    </div>
  );
};

export default App;
