import axios from 'axios';

const articlesAPI = process.env.REACT_APP_API_URL;

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${articlesAPI}/articles`);
    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err);
    throw err;
  }
};
