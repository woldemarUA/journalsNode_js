import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarItem({ href, text, className, aClass }) {
  return (
    <li className={className}>
      <Link
        className={aClass}
        to={href}
      >
        {text}
      </Link>
    </li>
  );
}
