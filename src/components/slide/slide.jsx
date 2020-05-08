import React from 'react';
import cls from './slide.module.scss';

export const Slide = (props) => {
  return (
    <div className={cls['slide']}>
      {props.children}
    </div>
  )
}