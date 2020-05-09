import React from 'react';
import cls from './slider.module.scss';

export const Slider = ({slides}) => {
  return (
    <div className={cls['slider']}>
      <div className={cls['slider__stage']}>
        {slides.map( (title, text) => {
          <article className={cls['slider__item']}>
            <h1>{title}</h1>
            <p>{text}</p>
          </article>
        })}
      </div>
      <input className={cls['slider__range']} type='range'/>
    </div>
  );
}