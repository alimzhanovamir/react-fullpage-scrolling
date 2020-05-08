import React, { useState, useEffect, useRef } from 'react';
import cls from './slider.module.scss';
import { Slide } from '../slide/slide';
import { Dots } from '../dots/dots';

export const Slider = () => {
  const slidesCount = 3;
  const sliderInnerRef = useRef(null);

  let currentSlide = 0;
  let childSetState;

  const catchChildState = setState => {
    childSetState = setState;
  }

  const setTransform = (slidesCount, currentSlide) => {
    sliderInnerRef.current.style.cssText = `transform: translateY(-${ 100 / slidesCount * currentSlide }%)`
  }

  // Колбэк события прокрутки
  const wheel = e => {
    const y = Math.sign(e.deltaY);
    
    if ( y > 0 && currentSlide + 1 < slidesCount ) {
      currentSlide = currentSlide + 1
    }

    else if ( y < 0 && currentSlide > 0 ) {        
      currentSlide = currentSlide - 1
    }
    
    setTransform(slidesCount, currentSlide);
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