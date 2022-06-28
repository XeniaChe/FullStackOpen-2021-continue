import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const showAllUsers = (allUsers) => (
  <div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <NavLink to={user.id}>{user.name}</NavLink>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Users = () => {
  const { allUsers } = useSelector((state) => state.users);
  return allUsers ? showAllUsers(allUsers) : null;
};

export const User = ({ user }) => {
  if (!user) return null;
  // console.log({ user });
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
