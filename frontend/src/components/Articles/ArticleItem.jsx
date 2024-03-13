import React from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

import { dateConvert } from '../../utils/dateConversion';
import ArticleManagementButtons from '../Assets/ArticleManagementButtons';
export default function ArticleItem({ article }) {
  const {
    image,
    author,
    title,
    description,
    created_at,
    updated_at,
    username,
  } = article;

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
        <Col>{username}</Col>
        <Col>{dateConvert(created_at)}</Col>
        <Col>{dateConvert(updated_at)}</Col>
        <Col>
          <ArticleManagementButtons article={article} />
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
