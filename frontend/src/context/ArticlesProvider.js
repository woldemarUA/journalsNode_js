import React, { createContext, useContext, useState } from 'react';
import { approveArticle } from '../apiCalls/fetchArticles';
import { useNavigate } from 'react-router-dom';

const ArticlesContext = createContext();

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider = ({ children }) => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const approveArticleHandler = async (id) => {
    try {
      approveArticle(id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ArticlesContext.Provider
      value={{ pending, setPending, approveArticleHandler }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
