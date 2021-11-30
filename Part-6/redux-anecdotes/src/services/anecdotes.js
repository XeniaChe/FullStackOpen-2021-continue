import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = () => {
  const request = axios.get(baseURL);

  return request.then((res) => res.data);
};

const addNew = (anecdote) => {
  const request = axios.post(baseURL, anecdote);

  return request.then((res) => res.data);
};

const addVotes = (id, anecdoteUpd) => {
  const request = axios.put(`${baseURL}/${id}`, anecdoteUpd);

  return request.then((res) => res.data);
};

const allRequests = { getAll, addNew, addVotes };
export default allRequests;
