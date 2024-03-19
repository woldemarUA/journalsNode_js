import React from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';

// id: 9, username: 'mario', email: 'ingrit81@gmail.com', roles: Array(2)
export const UserItem = ({ user }) => {
  const { username, email, roles } = user;
  return (
    <ListGroup.Item>
      <Row>
        <Col>{username}</Col>
        <Col>{email}</Col>
        <Col>
          {roles &&
            roles.map((role, index) => (
              <Badge
                key={index}
                bg='secondary'
                className='mx-1'
              >
                {role}
              </Badge>
            ))}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
