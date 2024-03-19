import axios from 'axios';

const usersAPI = process.env.REACT_APP_AUTH_URL;

export const fetchUsers = async (token) => {
  try {
    const response = await axios.get(`${usersAPI}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err);
    throw err;
  }
};
