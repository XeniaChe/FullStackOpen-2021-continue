import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/blogs';

const getAll = async () => {
  const result = await axios.get(baseUrl);
  console.log(result.data);
  return result.data;
};

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const sendNewBlog = async (blog) => {
  //sending TOKEN in request after user loged-in
  const config = {
    headers: { Authorization: token },
  };

  const result = await axios.post(baseUrl, blog, config);
  console.log(result.data);
  return result.data;
};

const updateBlog = async (id, updatedBlog) => {
  const result = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  console.log(result.data);
  return result.data;
};

const deleteBlog = async (id) => {
  //sending TOKEN in request after user loged-in
  const config = {
    headers: { Authorization: token },
  };
  const result = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(result.data);
  return result.data;
};

export default { getAll, sendNewBlog, updateBlog, setToken, deleteBlog };
