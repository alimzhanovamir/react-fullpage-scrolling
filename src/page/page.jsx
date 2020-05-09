import React from 'react';
import cls from './page.module.scss';
import { Slider } from '../components/fullpage-slider/fullpage-slider';

export const Page = () => {
  return (
   <div className={cls['page']}>
     <Slider/>
   </div>
  );
}