import React from 'react';
import ListItem from './ListItem';

export const ListContainer = ({ style, items }) => {
  return (
    <ul className={style.className}>
      {items.map((item, index) => {
        return (
          <ListItem
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
