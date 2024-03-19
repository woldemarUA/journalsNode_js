import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { useArticles } from '../../context/ArticlesProvider';
import { Button } from 'react-bootstrap';

const ArticleManagementButtons = ({ article }) => {
  const { user } = useUser() || {};
  const token = user ? user.token : null;
  const id = user ? user.userId : null;
  const { userId } = article;

  const { pending, approveArticleHandler } = useArticles();

  return (
    <>
      <Link
        to='/details'
        state={article}
        className='btn btn-outline-secondary btn-sm mx-1 mb-1'
      >
        Details
      </Link>
      {pending && (
        <Button
          variant='outline-warning'
          size='sm'
          onClick={() => approveArticleHandler(article.id)}
        >
          Approuver
        </Button>
      )}
      {token && parseInt(id, 10) === userId && (
        <>
          <Link
            to='/edit'
            state={article}
            className='btn btn-outline-success btn-sm  mx-1 mb-1'
          >
            Modifier
          </Link>
          <Link
            to='/delete'
            state={article}
            className='btn btn-outline-danger btn-sm  mx-1 mb-1'
          >
            Effacer
          </Link>
        </>
      )}
    </>
  );
};

export default ArticleManagementButtons;
