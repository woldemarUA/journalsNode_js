import React from 'react';

import { dateConvert } from '../../utils/dateConversion';

export default function ArticleItem({ article }) {
  const { image, author, title, description, created_at, updated_at } = article;

  return (
    <li className='list-group-item'>
      <div className='row'>
        <div className='col-2'>
          <img
            src={image}
            alt=''
            srcset=''
            className='img-fluid rounded'
          />
        </div>
        <div className='col'>{author}</div>
        <div className='col'>{title}</div>
        <div className='col'>{description}</div>
        <div className='col'>{article.User.nom}</div>
        <div className='col'>{dateConvert(created_at)}</div>
        <div className='col'>{dateConvert(updated_at)}</div>
      </div>
    </li>
  );
}

// "id": 89,
//     "author": "Hugo",
//     "userId": 2,
//     "title": "Gaetan",
//     "description": "fdskfjdlskjflkdsjf",
//     "image": "https://tymchenko.fr/images/default2.png",
//     "is_approved": true,
//     "created_at": "2024-03-04T14:25:59.000Z",
//     "updated_at": "2024-03-04T14:25:59.000Z",
//     "User": {
//       "nom":
