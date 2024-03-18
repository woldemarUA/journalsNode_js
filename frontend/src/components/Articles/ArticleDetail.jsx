import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useLocation } from 'react-router-dom';
import { dateConvert } from '../../utils/dateConversion';
import { deleteArticle } from '../../apiCalls/fetchArticles';

const ArticleDetail = ({ page }) => {
  const location = useLocation();
  const [msg, setMsg] = useState(null);
  const article = location.state;
  const {
    image,
    author,
    title,
    description,
    created_at,
    updated_at,
    username,
  } = article;

  const handleDelete = async (id) => {
    try {
      const res = await deleteArticle(id);

      setMsg(res.msg);
    } catch (err) {
      setMsg(err.response.data);
    }
  };
  return (
    <>
      {page === 'delete' && (
        <>
          <Alert variant='danger'>
            {msg ||
              `Êtes-vous sûr de vouloir supprimer ce journal ? Ça ne peut
            pas être annulé`}
          </Alert>
          <div className='mb-2'>
            {article.id && (
              <Button
                variant='danger'
                size='sm'
                onClick={() => handleDelete(article.id)}
              >
                Confirmer
              </Button>
            )}
          </div>
        </>
      )}
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
            <Col>Cree par {username}: </Col>
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
    </>
  );
};

export default ArticleDetail;
