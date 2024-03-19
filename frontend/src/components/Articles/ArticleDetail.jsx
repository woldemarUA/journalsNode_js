import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { dateConvert } from '../../utils/dateConversion';
import { deleteArticle } from '../../apiCalls/fetchArticles';

const ArticleDetail = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);
  const [delBtn, setDelBtn] = useState(false);
  const [visible, setVisible] = useState('');

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
  useEffect(() => {
    if (page === 'delete') {
      setDelBtn(true);
    }
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const res = await deleteArticle(id);
      setDelBtn(false);
      setMsg(res.msg);
      setVisible('d-none');
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {page === 'delete' && (
        <Alert variant='danger'>
          {msg ||
            `Êtes-vous sûr de vouloir supprimer ce journal ? Ça ne peut
            pas être annulé`}
          <Button
            onClick={goBack}
            className='btn btn-success mx-3'
          >
            Retour a liste
          </Button>
        </Alert>
      )}

      <div className='mb-2'>
        {delBtn && (
          <>
            <div className='mb-2'>
              <Button
                variant='danger'
                size='sm'
                onClick={() => handleDelete(article.id)}
                className={visible}
              >
                Confirmer
              </Button>
            </div>
          </>
        )}
      </div>
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
          <Button
            onClick={goBack}
            className='btn btn-success mx-3'
          >
            Retour a liste
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ArticleDetail;
