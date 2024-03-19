import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  approveArticle,
  fetchArticles,
  addArticle,
  deleteArticle,
  fetchPendingArticles,
  editArticle,
} from '../apiCalls/fetchArticles';

import { useUser } from './UserProvider';

const ArticlesContext = createContext();

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider = ({ children }) => {
  const { user, refetchFlag, setRefetchFlag } = useUser();
  const { roles, userId, username, token } = user || {};
  const [pending, setPending] = useState(false);
  const [articlesAPI, setArticlesAPI] = useState([]);
  const [pendingArticles, setPendingArticles] = useState([]);

  const approveArticleHandler = async (id) => {
    try {
      await approveArticle(id, token);
      setRefetchFlag((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticleHandler = async (id) => {
    try {
      const resp = await deleteArticle(id, token);
      setRefetchFlag((prev) => !prev);
      return resp;
    } catch (err) {
      console.error(err);
    }
  };

  const editArticleHandler = async (article) => {
    try {
      const resp = await editArticle(article, token);
      setRefetchFlag((prev) => !prev);
      return resp;
    } catch (err) {
      console.error(err);
    }
  };
  const addArticleHandler = async (article) => {
    try {
      const resp = await addArticle(article, token);
      setRefetchFlag((prev) => !prev);
      return resp;
    } catch (err) {
      console.error(err);
    }
  };
  // approved articles
  useEffect(() => {
    fetchArticles().then((res) => setArticlesAPI(res));
  }, [refetchFlag]);
  // pending articles
  useEffect(() => {
    if (token && roles.includes('admin')) {
      fetchPendingArticles(token).then((res) => setPendingArticles(res));
    }
  }, [token, roles, refetchFlag]);

  return (
    <ArticlesContext.Provider
      value={{
        pending,
        articlesAPI,
        pendingArticles,
        username,
        roles,
        userId,

        setPending,
        approveArticleHandler,
        deleteArticleHandler,
        editArticleHandler,
        addArticleHandler,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
