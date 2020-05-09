import React, { useEffect, useState } from 'react';
import cls from './slider-range.module.scss';

export const SliderRange = ({slidesCount, setSlide}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const slideRange = 100/slidesCount;
  // const 

  const moveSlides = e => {
    // console.log(e.currentTarget.value);
    setCurrentValue(e.currentTarget.value)
    const x = Math.ceil(e.currentTarget.value / slideRange - 1);
    console.log(x);
    
    setSlide(x);
  };

  // useEffect( () => {

  // }, []);

  return (
    <div className={cls['slider-range']}>
      <div className={cls['slider-range__tags']}></div>
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