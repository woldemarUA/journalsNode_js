import axios from 'axios';

const authPath = process.env.REACT_APP_AUTH_URL;

export const login = async (user) => {
  try {
    const response = await axios.post(`${authPath}/login`, user);
    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err.response.data.message);

    throw err.response.data;
  }
};
export const register = async (user) => {
  console.log(user);
};
