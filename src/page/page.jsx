import React from 'react';
import cls from './page.module.scss';
import { Fullpageslider } from '../components/fullpage-slider/fullpage-slider';
import { Slider } from '../components/slider/slider';

export const Page = () => {
  const slides = [
    '1',
    '2',
    <Slider items={[]}/>
  ]

  // console.log(slides);
  
  return (
    <div className={cls['page']}>
      {console.log('render page')}
      <Fullpageslider slides={slides}/>
   </div>
  );
}