import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Reducers
import {
  updateBlog,
  deleteBlog,
  sendNewBlog,
} from '../store/reducers/blogsReducer';

// Components
import Toogable from './Toogable';
import BlogForm from './BlogForm';
import { NavLink, useNavigate } from 'react-router-dom';

export const Blogs = ({ blogs }) => {
  //useRef to use here the method declared inside <Toogable/>
  const toogableRef = useRef();
  const dispatch = useDispatch();

  const sendNewBlogHandler = (blog) => {
    dispatch(sendNewBlog(blog));
    //invoke the method for toogling visibility declared in <Toogable/>
    toogableRef.current.toogleVisibility();
  };

  return (
    <div>
      {' '}
      <h2>Blogs</h2>
      <Toogable ref={toogableRef}>
        <BlogForm sendBlog={sendNewBlogHandler} />
      </Toogable>
      {blogs.map((blog) => (
        <NavLink to={`/blogs/${blog.id}`} key={blog.id}>
          <p>{blog.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) return null;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const likesBoxStyle = {
    display: 'flex',
  };

  const delButtonStyle = {
    backgroundColor: 'blue',
  };

  const likesPlusOne = (oldCount) => ++oldCount;

  const increaseLikesHandler = async () => {
    try {
      // increase local state likes by 1
      const newCount = likesPlusOne(blog.likes);

      //create new updated blog to send
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newCount,
        userId: blog.user.id,
      };

      // get clicked blog's id
      const id = blog.id;

      // send new blog to the server with PUT request
      dispatch(updateBlog(id, updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  //check if user is the creatotor of the blog
  const checkingCreator = () => {
    //return if blog has no creator
    if (!blog.user) return;

    //get logged user from storage
    const loggedUserJson = window.localStorage.getItem('loggedInUserJson');
    const loggedUser = JSON.parse(loggedUserJson);

    if (!loggedUser) return;

    return blog.user.username === loggedUser.username;
  };

  const showIfCretorMatches = {
    ...delButtonStyle,
    display: checkingCreator() ? '' : 'none',
  };

  const deleteBlogHandler = () => {
    dispatch(deleteBlog(blog));
    navigate('/blogs');
  };

  return (
    <div style={blogStyle} className='testVisible'>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <div style={likesBoxStyle}>
        <p id='likes'>likes: {blog.likes} </p>
        <button onClick={increaseLikesHandler} id='likeBtn'>
          like
        </button>
        <p>Added by: {blog.author}</p>
      </div>
      <button
        onClick={deleteBlogHandler}
        style={showIfCretorMatches}
        id='deleteBlog'
      >
        remove
      </button>
    </div>
  );
};

export default Blog;
