import React, { useState } from 'react';
import cls from './dots.module.scss';

export const Dots = ({slidesCount, currentSlide, setSlide, catchChildState}) => {
  const [activeButton, setActiveButton] = useState(currentSlide);
  const dots = [];
  
  catchChildState(setActiveButton);
  
  for (let i = 0; i < slidesCount; i++) {
    dots.push(i);
  }

  
  return (
   <ul className={cls['dots']}>
    {dots.map( id => (
      <li className={cls['dot']}>
        <button
          className={`${cls['dot__button']} ${activeButton === id ? cls['dot__button--active'] : ''}`}
          onClick={() => {
            setSlide(id);
            setActiveButton(id)
          }}
          aria-label={`Переключить на страницу номер ${id+1}`}
          ></button>
      </li>
    ))}
   </ul>
  );
}