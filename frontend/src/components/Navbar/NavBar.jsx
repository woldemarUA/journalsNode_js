import React from 'react';

import { ListContainer } from '../Assets/ListContainer';

export default function NavBar() {
  const navClass = { className: 'navbar-nav' };
  const navItems = [
    { href: '#', text: 'Acceuil', className: 'nav-item', aClass: 'nav-link' },
    {
      href: `${process.env.REACT_APP_API_URL}/articles`,
      text: 'Articles',
      className: 'nav-item',
      aClass: 'nav-link',
    },
    {
      href: `${process.env.REACT_APP_AUTH_URL}/users`,
      text: 'Users',
      className: 'nav-item',
      aClass: 'nav-link',
    },
  ];
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse'>
          <ListContainer
            style={navClass}
            items={navItems}
          />{' '}
        </div>
      </div>
    </nav>
  );
}
