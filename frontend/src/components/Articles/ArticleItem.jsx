import React from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dateConvert } from '../../utils/dateConversion';

export default function ArticleItem({ article }) {
  const { image, author, title, description, created_at, updated_at, User } =
    article;

  return (
    <ListGroup.Item>
      <Row>
        <Col xs={2}>
          <Image
            src={image}
            fluid
            rounded
            alt={title}
          />
        </Col>
        <Col>{author}</Col>
        <Col>{title}</Col>
        <Col>{description}</Col>
        <Col>{User.nom}</Col>
        <Col>{dateConvert(created_at)}</Col>
        <Col>{dateConvert(updated_at)}</Col>
        <Col>
          <Link
            to='/details'
            state={article}
          >
            Details
          </Link>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
