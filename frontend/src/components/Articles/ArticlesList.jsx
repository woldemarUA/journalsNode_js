import React, { useEffect, useState } from 'react';

import { fetchArticles } from '../../apiCalls/fetchArticles';
import ArticleItem from './ArticleItem';
export default function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchArticles();
        setArticles(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error {error.message}</div>;
  return (
    <ul className='list-group list-group-flush my-2'>
      <li className='list-group-item'>
        <div className='row'>
          <div className='col-2'>Image</div>
          <div className='col'>Auteur</div>
          <div className='col'>Titre</div>
          <div className='col'>Description</div>
          <div className='col'>Cree par</div>
          <div className='col'>Cree a</div>
          <div className='col'>Editee a</div>
        </div>
      </li>
      {articles.map((article, index) => {
        return (
          <ArticleItem
            key={index}
            article={article}
          />
        );
      })}
    </ul>
  );
}
