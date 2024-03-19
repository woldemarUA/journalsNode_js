import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

import ArticleItem from './ArticleItem';

export default function ArticlesList({ articles }) {
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
