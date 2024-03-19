import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Spinner, Alert } from 'react-bootstrap';

import { fetchArticles } from '../../apiCalls/fetchArticles';
import ArticleItem from './ArticleItem';
import { useArticles } from '../../context/ArticlesProvider';
import { useUser } from '../../context/UserProvider';

export default function ArticlesList({ pending }) {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setPending } = useArticles();
  const { user } = useUser();
  const token = user ? user.token : null;
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setPending(pending);
        let fetchedData;
        if (pending) {
          if (!token) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            fetchedData = await fetchArticles(pending, token);
          }
          fetchedData = await fetchArticles(pending, token);
        } else {
          fetchedData = await fetchArticles();
        }
        setArticles(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pending, setPending, token]);

  if (loading)
    return (
      <Spinner
        animation='border'
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  if (error) return <Alert variant='danger'>Error: {error.message}</Alert>;

  return (
    <ListGroup
      className='my-2'
      variant='flush'
    >
      <ListGroup.Item>
        <Row>
          <Col xs={2}>Image</Col>
          <Col>Auteur</Col>
          <Col>Titre</Col>
          <Col>Description</Col>
          <Col>Créé par</Col>
          <Col>Créé à</Col>
          <Col>Édité à</Col>
          <Col>Gerer</Col>
        </Row>
      </ListGroup.Item>
      {articles &&
        articles.map((article, index) => (
          <ArticleItem
            key={index}
            article={article}
          />
        ))}
    </ListGroup>
  );
}
