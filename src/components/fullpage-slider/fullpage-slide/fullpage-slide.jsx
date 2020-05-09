import React from 'react';
import cls from './fullpage-slide.module.scss';

export const Fullpageslide = ({pageNumber, children}) => {
  return (
    <div className={cls['fullpage-slide']}>
      <div className={cls['fullpage-slide__number']}>{`Page number ${pageNumber}`}</div>
      {children}
    </div>
  )
}