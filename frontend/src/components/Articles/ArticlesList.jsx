import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Spinner, Alert } from 'react-bootstrap';

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
