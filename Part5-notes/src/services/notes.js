import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/notes';
// const baseUrl = '/api/notes'; //RELATIVE PATH /// add 'proxy' to package.json

//getting TOKEN after user loged-in
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);

  const notExist = {
    content: 'not exist',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
    id: 1000,
  };
  return request.then((reponse) => reponse.data.concat(notExist));
};

const create = (newNote) => {
  //sending TOKEN in request after user loged-in
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, newNote, config);
  return request.then((response) => response.data);
};

const update = (id, newNote) => {
  const request = axios.put(`${baseUrl}/${id}`, newNote);

  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
