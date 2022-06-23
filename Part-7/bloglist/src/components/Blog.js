import React, { useState } from 'react';
import blogServices from '../services/blogs';

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);

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

  let label = !showMore ? 'view' : 'hide';
  const visibleIfShowMore = { display: showMore ? '' : 'none' };

  const toogleShow = () => {
    setShowMore(!showMore);
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
      await blogServices.updateBlog(id, updatedBlog);
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

  const deleteBlogHandler = async () => {
    try {
      //get blog's id
      const id = blog.id;
      console.log(`blogs id to delete: ${id}`);

      //get delete confirmation
      const deleteConfirm = window.confirm(`Delete ${blog.title} ?`);

      if (deleteConfirm) {
        //send delete request
        await blogServices.deleteBlog(id);
        console.log(`blog: ${blog.title} deleted`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyle} className='testVisible'>
      <p>{blog.title}</p>
      <p>author: {blog.author}</p>
      <button onClick={toogleShow}>{label}</button>
      <div style={visibleIfShowMore} className='testInvisible'>
        <p>{blog.url}</p>
        <div style={likesBoxStyle}>
          <p id='likes'>likes: {blog.likes} </p>
          <button onClick={increaseLikesHandler} id='likeBtn'>
            like
          </button>
        </div>
        <button
          onClick={deleteBlogHandler}
          style={showIfCretorMatches}
          id='deleteBlog'
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
