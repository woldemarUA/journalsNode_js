import React, { useEffect } from 'react';
import { useUser } from '../../context/UserProvider';
import { useArticles } from '../../context/ArticlesProvider';
import { Alert, Accordion, Badge } from 'react-bootstrap';
import ArticlesList from '../Articles/ArticlesList';
import { ListUsers } from '../Users/ListUsers';

function DashboardPage() {
  const { user, isAdmin, users } = useUser();
  const { pendingArticles, setPending } = useArticles();

  useEffect(() => {
    setPending(true);
  }, [setPending]);

  return (
    <>
      <Alert variant='success'> Bonjour {user.username || 'Guest'}</Alert>

      {isAdmin && (
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              Journals a approve{' '}
              {pendingArticles.length > 0 && (
                <Badge bg='danger'>{pendingArticles.length}</Badge>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <ArticlesList articles={pendingArticles} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>Liste des utilisateurs</Accordion.Header>
            <Accordion.Body>
              <ListUsers users={users} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}

export default DashboardPage;
