import React, { useEffect, useRef, Component } from 'react';
import cls from './fullpage-slider.module.scss';
import { Fullpageslide } from './fullpage-slide/fullpage-slide';
import { Dots } from './dots/dots';

export const Fullpageslider = ({slides}) => {
  console.log(slides);
  
  const slidesCount = slides.length;
  const sliderInnerRef = useRef(null);
  const sliderRef = useRef(null);
  
  let wheelScrollCount = 0;
  const scrollDelay = 300;
  const neededWheelScrollCount = 3
  let currentSlide = 0;
  let childSetState;
  let timeout;

  const catchChildState = setState => {
    childSetState = setState;
  }

  // Переключение слайдов
  const setTransform = (slidesCount, currentSlide) => {
    sliderInnerRef.current.style.cssText = `
    -webkit-transform: translateY(-${ 100 / slidesCount * currentSlide }%);
        -ms-transform: translateY(-${ 100 / slidesCount * currentSlide }%);
            transform: translateY(-${ 100 / slidesCount * currentSlide }%);`
  }

  // begin::: Колбэк события прокрутки
  const wheel = e => {   
    // Инкременентируем количество прокруток
    wheelScrollCount++;
    
    const direction = Math.sign(e.deltaY);
    
    if ( direction > 0 && currentSlide + 1 < slidesCount && wheelScrollCount > neededWheelScrollCount) {
      currentSlide = currentSlide + 1
      // Делаем сброс кол-ва прокруток как только произошло событие переключения
      wheelScrollCount = 0;
    }

    else if ( direction < 0 && currentSlide > 0 && wheelScrollCount > neededWheelScrollCount) {
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
    }, scrollDelay);

    // Пееключить слайд
    setTransform(slidesCount, currentSlide);
    // Изменить стейт компонента Dots, задать значение текущего слайда
    childSetState(currentSlide);
  }
  // end::: Колбэк события прокрутки

  // begin::: Колбэк события клика на точки
  const setSlide = id => {
    setTransform(slidesCount, id);
  }
  // end::: Колбэк события клика на точки



  let touchStart = 0;
  let touchEnd = 0;
  let touchTimer;
  const swipeCountToChange = 150;

  const setSlideFromTouch = (touchStart, touchEnd) => {
    console.log(touchStart, touchEnd);
    console.log( Math.abs(touchStart - touchEnd));
    const neededSwipeCount = Math.abs(touchStart - touchEnd) > swipeCountToChange;
    
    if ( neededSwipeCount ) {
      if ( touchStart > touchEnd && currentSlide + 1 < slidesCount) {
        currentSlide = currentSlide + 1
        // Делаем сброс кол-ва прокруток как только произошло событие переключения
        wheelScrollCount = 0;
      }
      else if ( touchStart < touchEnd && currentSlide > 0 ) {
        currentSlide = currentSlide - 1
        // Делаем сброс кол-ва прокруток как только произошло событие переключения
        wheelScrollCount = 0;
      }
  
      // Пееключить слайд
      setTransform(slidesCount, currentSlide);
      // Изменить стейт компонента Dots, задать значение текущего слайда
      childSetState(currentSlide);
    }
  }

  const touchStartHandler = e => {
    touchStart = e.touches[0].pageY;
  }

  const touchMoveHandler = e => {
    touchEnd = e.changedTouches[0].pageY;

    if ( touchTimer ) {
      clearTimeout(touchTimer);
    }

    // Сброс количества прокруток
    touchTimer = setTimeout( () => {
      setSlideFromTouch(touchStart, touchEnd);
    }, scrollDelay);

  }

  /* Жизненный цикл "монтирован"
   * Добавляем слушатель на window
   */ 
  useEffect(() => {
    window.addEventListener('wheel', wheel);
    sliderRef.current.addEventListener('touchstart', touchStartHandler);
    sliderRef.current.addEventListener('touchmove', touchMoveHandler);
    return () => window.removeEventListener('wheel', wheel);
  },[]);

  return (
    <>
      {console.log('render')}
      <div className={cls['fullpage-slider']} ref={sliderRef}>
        <div
          className={cls['fullpage-slider__inner']}
          ref={sliderInnerRef}>
          {slides.map( (content, idx) => <Fullpageslide pageNumber={idx + 1}>{content}</Fullpageslide> )}
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