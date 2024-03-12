import React from 'react';
import NavBarItem from './NavBarItem';

export const NavBarContainer = ({ style, items }) => {
  return (
    <ul className={style.className}>
      {items.map((item, index) => {
        return (
          <NavBarItem
            key={index}
            href={item.href}
            text={item.text}
            className={item.className}
            aClass={item.aClass}
          />
        );
      })}
    </ul>
  );
};
