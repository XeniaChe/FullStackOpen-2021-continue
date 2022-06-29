import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useMatch, NavLink } from 'react-router-dom';

// Services

// Components
import './App.css';
import Blog, { Blogs } from './components/Blog';
import { getInitBlogs } from './store/reducers/blogsReducer';
import { Users, User } from './components/Users';

// Redux
import {
  setUserCredentials,
  useExistingUser,
  userLogin,
  userLogOut,
  getAllUsers,
} from './store/reducers/userDataReducer';

const App = () => {
  // Redux
  const dispatch = useDispatch();
  const { user, userName, password, allUsers } = useSelector(
    (state) => state.users
  );
  const { showNotifSuccess, successMessage, errorMessage, showNotifError } =
    useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  /// ROUTING
  // To define a currently clicked item
  const matchUser = useMatch('users/:userId');
  const userClicked = matchUser
    ? allUsers.find((user) => user.id === matchUser.params.userId)
    : null;

  const blogMatch = useMatch('/blogs/:blogId');
  const blogClicked = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.blogId)
    : null;

  useEffect(() => {
    // get init blogs
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

      dispatch(getAllUsers());
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

    dispatch(getAllUsers());
  };

  //LogOut and remove user and TOKEN from localStorage
  const logOutHandler = () => {
    window.localStorage.removeItem('loggedInUserJson');
    dispatch(userLogOut());
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

  const showUserInfo = () => (
    <div>
      <nav>
        <NavLink to='users'>Users</NavLink>
        <NavLink to='blogs'>Blogs</NavLink>
        <button onClick={logOutHandler}>log out</button>
        <p>{user.username} is logged-in</p>
      </nav>
    </div>
  );

  return (
    <div>
      {user ? showUserInfo() : showLoginForm()}

      {showNotifSuccess && notifSuccses(successMessage)}
      {showNotifError && notifError(errorMessage)}

      <Routes>
        <Route path='blogs' element={<Blogs blogs={blogs} />} />
        <Route path='users' element={user === null ? null : <Users />} />
        <Route
          path='users/:userId'
          element={userClicked === null ? null : <User user={userClicked} />}
        />
        <Route
          path='blogs/:blogId'
          element={blogClicked === null ? null : <Blog blog={blogClicked} />}
        />
      </Routes>
    </div>
  );
};

export default App;
