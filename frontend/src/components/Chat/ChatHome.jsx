import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

import { useChat } from '../../context/ChatProvider';

export const ChatHome = () => {
  const [newMessage, setNewMessage] = useState('');
  const { messages, sendMessage } = useChat();

  const handleMessage = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '300px',
        maxHeight: '400px',
        overflow: 'auto',
      }}>
      <Container>
        <Card
          border='secondary'
          style={{ width: '18rem' }}>
          <Card.Header>Chat</Card.Header>
          <Card.Body>
            <Card.Title>With user</Card.Title>

            {messages.map((msg, key) => {
              return <Card.Text key={key}> {msg} </Card.Text>;
            })}
            <Form onSubmit={handleMessage}>
              <Form.Group
                className='mb-3'
                controlId='messageInput'>
                <Form.Control
                  type='text'
                  placeholder='Type a message...'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Button
                variant='primary'
                type='submit'>
                Send
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

{
  /* <p className='h5'>Chat</p>
        <ListGroup variant='flush'>
          {messages.map((msg, index) => {
            return <ListGroup.Item key={index}>{msg}</ListGroup.Item>;
          })}
        </ListGroup> */
}
