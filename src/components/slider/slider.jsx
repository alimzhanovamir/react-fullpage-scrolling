import React, { useEffect, useRef } from 'react';
import cls from './slider.module.scss';
import { SliderRange } from './slider-range/slider-range';

export const Slider = ({items}) => {
  const slidesCount = items.length;
  const sliderStage = useRef(null);

  // Переключение слайдов
  const setTransform = (slidesCount, currentSlide) => {
    sliderStage.current.style.cssText = `
    -webkit-transform: translateX(-${ 100 * currentSlide }vw);
        -ms-transform: translateX(-${ 100 * currentSlide }vw);
            transform: translateX(-${ 100 * currentSlide }vw);`
  }

  const setSlide = id => {
    setTransform(slidesCount, id);
  }
  
  return (
    <div className={cls['slider']}>
      <div className={cls['slider__stage']} ref={sliderStage}>
        {items.map( ({title, text}, idx) => (
          <article className={cls['slider__item']} key={idx}>
            <h1 className={cls['slider__title']}>{title}</h1>
            <p className={cls['slider__text']}>{text}</p>
          </article>
        ))}
      </div>
      <div className={cls['slider__range']}>
        <SliderRange 
          slidesCount={slidesCount}
          setSlide={setSlide}/>
      </div>
    </div>
  );
}