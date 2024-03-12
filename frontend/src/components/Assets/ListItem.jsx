import React from 'react';

export default function ListItem({ href, text, className, aClass }) {
  return (
    <li className={className}>
      <a
        className={aClass}
        href={href}
      >
        {text}
      </a>
    </li>
  );
}
