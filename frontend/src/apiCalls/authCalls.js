import axios from 'axios';

const authPath = process.env.REACT_APP_AUTH_URL;

export const login = async (user) => {
  try {
    const response = await axios.post(`${authPath}/login`, user);
    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err);

    throw err.response.data;
  }
};
export const register = async (user) => {
  try {
    const response = await axios.post(`${authPath}/register`, user);
    console.log(response);

    return response.status;
  } catch (err) {
    console.error('failed to register user', user);
    throw err;
  }
};
