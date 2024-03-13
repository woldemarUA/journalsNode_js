import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useLocation } from 'react-router-dom';
import { dateConvert } from '../../utils/dateConversion';

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state;
  const { image, author, title, description, created_at, updated_at, User } =
    article;
  return (
    <Card>
      <Card.Header as='h5'>{title}</Card.Header>
      <Card.Img
        variant='top'
        src={image}
      />
      <Card.Body>
        <Card.Title>{author}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Row>
          <Col>Cree par {User.nom}: </Col>
          <Col> {dateConvert(created_at)}</Col>
          <Col>modifie:{dateConvert(updated_at)}</Col>
        </Row>
        <Link
          to='/'
          className='btn btn-outline-secondary'
        >
          Retour a liste
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleDetail;
