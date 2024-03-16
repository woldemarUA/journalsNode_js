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

export const addArticle = async (article) => {
  try {
    // post request

    const formData = new FormData();
    for (const key in article) {
      formData.append(key, article[key]);
    }
    const response = await axios.post(`${articlesAPI}/articles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('failed to upload article', err);
    throw err;
  }
};

export const deleteArticle = async (id) => {
  try {
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const editArticle = async (article) => {
  try {
    // patch request

    const formData = new FormData();
    for (const key in article) {
      formData.append(key, article[key]);
    }
    const response = await axios.patch(
      `${articlesAPI}/articles/${article.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('failed to edit article', err);
    throw err;
  }
};
