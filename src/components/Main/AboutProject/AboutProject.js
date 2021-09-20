import React from 'react';

const AboutProject = () => (
  <section className='about'>
    <h3 className='about__title'>О проекте</h3>
    <div className='about__grid-wrapper '>
      <p className='about__caption'>Дипломный проект включал 5 этапов</p>
      <p className='about__caption'>На выполнение диплома ушло 5 недель</p>
      <p className='about__text'>Составление плана, работу над бэкендом,
        вёрстку, добавление функциональности и финальные доработки.</p>
      <p className='about__text'>У каждого этапа был мягкий и жёсткий дедлайн,
        которые нужно было соблюдать, чтобы успешно защититься.</p>
    </div>
    <div className='about__timescale'>
      <p className='about__time-short'>1 неделя</p>
      <p className='about__time-long'>4 недели</p>
      <p className='about__subtitle'>Back-end</p>
      <p className='about__subtitle'>Front-end</p>
    </div>
  </section>
);

export default AboutProject;
