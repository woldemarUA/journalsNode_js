import axios from 'axios';

const articlesAPI = process.env.REACT_APP_API_URL;
// const Authorization = `Bearer ${localStorage.getItem('token') || null}`;

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${articlesAPI}/articles`);

    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err);
    throw err;
  }
};
export const fetchPendingArticles = async (token) => {
  try {
    const response = await axios.get(`${articlesAPI}/articles/admin/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    console.error('failed to fetch data', err);
    throw err;
  }
};

// AUTH REQUESTS

export const addArticle = async (article, token) => {
  try {
    // post request

    const formData = new FormData();
    for (const key in article) {
      formData.append(key, article[key]);
    }
    const response = await axios.post(`${articlesAPI}/articles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('failed to upload article', err);
    throw err;
  }
};

export const deleteArticle = async (id, token) => {
  try {
    const response = await axios.delete(`${articlesAPI}/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const editArticle = async (article, token) => {
  try {
    // patch request

    const formData = new FormData();
    for (const key in article) {
      formData.append(key, article[key]);
    }
    const response = await axios.patch(
      `${articlesAPI}/articles/edit/${article.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('failed to edit article', err);
    throw err;
  }
};

export const approveArticle = async (id, token) => {
  // /admin/approve/
  try {
    const response = await axios.patch(
      `${articlesAPI}/articles/admin/approve/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
