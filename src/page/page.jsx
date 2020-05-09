import React from 'react';
import cls from './page.module.scss';
import { Fullpageslider } from '../components/fullpage-slider/fullpage-slider';
import { Slider } from '../components/slider/slider';

export const Page = () => {
  const sliderData = [
    {
      title: 'Что такое Lorem Ipsum?',
      text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.'
    },
    {
      title: 'Почему он используется?',
      text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.'
    },
    {
      title: 'Откуда он появился?',
      text: 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад.'
    }
  ]
  const slides = [
    <Slider items={sliderData}/>,
    'Hello',
    'World',
  ]

  // console.log(slides);
  
  return (
    <div className={cls['page']}>
      {console.log('render page')}
      <Fullpageslider slides={slides}/>
   </div>
  );
}