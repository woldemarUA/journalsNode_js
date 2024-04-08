import React, { useEffect } from 'react';

import { useArticles } from '../../context/ArticlesProvider';
import ArticlesList from '../Articles/ArticlesList';
import { ChatHome } from '../Chat/ChatHome';

export const Home = () => {
  const { articlesAPI, setPending } = useArticles();

  useEffect(() => {
    setPending(false);
  }, [setPending]);

  return (
    <>
      <ArticlesList articles={articlesAPI} />
      <ChatHome />
    </>
  );
};