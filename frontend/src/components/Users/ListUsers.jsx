import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { UserItem } from './UserItem';

export const ListUsers = ({ users }) => {
  return (
    <>
      <ListGroup
        className='my-2'
        variant='flush'
      >
        <ListGroup.Item>
          <Row>
            <Col>Nom d'utilisateur</Col>
            <Col>Email</Col>
            <Col>Roles</Col>
          </Row>
        </ListGroup.Item>
        {users &&
          users.map((user, index) => (
            <UserItem
              key={index}
              user={user}
            />
          ))}
      </ListGroup>
    </>
  );
};
