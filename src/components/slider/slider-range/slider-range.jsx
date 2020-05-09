import React, { useEffect, useState } from 'react';
import cls from './slider-range.module.scss';

export const SliderRange = ({slidesCount, setSlide}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRange = 100/slidesCount;
  const tags = Array.from({length: slidesCount}, (elm, idx) => idx + 1);

  const moveSlides = e => {
    const value = e.currentTarget.value;
    const activeSlide = Math.ceil(value / slideRange - 1);
    setCurrentValue(value);
    setSlide(activeSlide);
    setActiveSlide(activeSlide);
  };

  return (
    <div className={cls['slider-range']}>
      <div 
        className={cls['slider-range__tags']} 
        style={{
          'margin-right': `-${(100 / slidesCount / 2) }%`,
          'margin-left': `-${(100 / slidesCount / 2) }%`
          }}>
        {tags.map( (id, idx) => (
          <div 
            className={cls['slider-range__tag']}
            style={{left: `${(100 / slidesCount * idx) + (100 / slidesCount / 2) }%`}}
          >
            <span className={`${cls['slider-range__tag-number']} ${ activeSlide === idx ? cls['slider-range__tag-number--active'] : ''}`}>{id}</span>
          </div>
        ))}
      </div>
      <input 
        className={cls['slider-range__input']}
        onChange={moveSlides}
        value={currentValue}
        type='range'
        min='0'
        max='100'
        step='1'
        aria-label={`Активный слайд ${currentValue === 0 ? 1 : Math.ceil(currentValue / slideRange)}`}
        title='Переключение сладов'
      />
    </div>
  );
}