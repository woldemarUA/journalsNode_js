import React from 'react';
import { useUser } from '../../context/UserProvider';
import { Alert, Accordion } from 'react-bootstrap';
import ArticlesList from '../Articles/ArticlesList';

function DashboardPage() {
  const { user } = useUser();
  const { roles } = user;

  return (
    <>
      <Alert variant='success'> Bonjour {user.username || 'Guest'}</Alert>

      {roles.includes('admin') && (
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Journals a approve</Accordion.Header>
            <Accordion.Body>
              <ArticlesList pending={true} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Liste des utilisateurs</Accordion.Header>
            <Accordion.Body>utlisqteurs</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}

export default DashboardPage;
