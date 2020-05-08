import React, { useState, useEffect, useRef } from 'react';
import cls from './slider.module.scss';
import { Slide } from '../slide/slide';
import { Dots } from '../dots/dots';

export const Slider = () => {
  const slidesCount = 3;
  const sliderInnerRef = useRef(null);
  
  let wheelScrollCount = 0;
  let currentSlide = 0;
  let childSetState;
  let timeout;

  const catchChildState = setState => {
    childSetState = setState;
  }

  // Переключение слайдов
  const setTransform = (slidesCount, currentSlide) => {
    sliderInnerRef.current.style.cssText = `transform: translateY(-${ 100 / slidesCount * currentSlide }%)`
  }

  // Колбэк события прокрутки
  const wheel = e => {
    // Инкременентируем количество прокруток
    wheelScrollCount++;
    
    const direction = Math.sign(e.deltaY);
    
    if ( direction > 0 && currentSlide + 1 < slidesCount && wheelScrollCount > 4) {
      currentSlide = currentSlide + 1
      // Делаем сброс кол-ва прокруток как только произошло событие переключения
      wheelScrollCount = 0;
    }

    else if ( direction < 0 && currentSlide > 0 && wheelScrollCount > 4) {
      currentSlide = currentSlide - 1
      // Делаем сброс кол-ва прокруток как только произошло событие переключения
      wheelScrollCount = 0;
    }

    if ( timeout ) {
      clearTimeout(timeout);
    }

    // Сброс количества прокруток
    timeout = setTimeout( () => {
      // Делаем сброс кол-ва прокруток, если вышел таймаут
      wheelScrollCount = 0;
    }, 500)

    // Пееключить слайд
    setTransform(slidesCount, currentSlide);
    // Изменить стейт компонента Dots, задать значение текущего слайда
    childSetState(currentSlide);
  }

  // Колбэк события клика на точки
  const setSlide = id => {
    setTransform(slidesCount, id);
  }

  /* Жизненный цикл "монтирован"
   * Добавляем слушатель на window
   */ 
  useEffect(() => {
    window.addEventListener('wheel', wheel);
    return () => window.removeEventListener('wheel', wheel);
  },[]);

  return (
    <>
      {console.log('render')}
      <div className={cls['slider']}>
        <div
          className={cls['slider__inner']}
          ref={sliderInnerRef}>
          <Slide classModifier>
            <div>1</div>
          </Slide>
          <Slide classModifier>
            <div>2</div>
          </Slide>
          <Slide classModifier>
            <div>3</div>
          </Slide>
        </div>
      </div>

      <Dots
        slidesCount={slidesCount}
        currentSlide={currentSlide}
        setSlide={setSlide}
        catchChildState={catchChildState}
        />
    </>
  );
}