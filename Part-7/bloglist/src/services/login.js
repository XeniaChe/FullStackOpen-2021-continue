import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/login';

const logIn = async (credentials) => {
  const result = await axios.post(baseUrl, credentials);
  return result.data;
};

export default { logIn };
