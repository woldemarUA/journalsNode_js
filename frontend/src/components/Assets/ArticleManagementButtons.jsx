import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';

const ArticleManagementButtons = ({ article }) => {
  const token = localStorage.getItem('token');
  const { user } = useUser();
  const id = user.userId;
  const { userId } = article;

  return (
    <>
      <Link
        to='/details'
        state={article}
        className='btn btn-outline-secondary btn-sm mx-1 mb-1'
      >
        Details
      </Link>
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
