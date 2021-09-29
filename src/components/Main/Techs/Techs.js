import React from 'react';

const Techs = () => (
  <section className='techs'>
    <h2 className='techs__title'>Технологии</h2>
    <h3 className='techs__subtitle'>7 технологий</h3>
    <p className='techs__text'>На курсе веб-разработки мы освоили технологии,
      которые применили в дипломном проекте.
    </p>
    <ul className='techs__grid'>
      <li className='techs__grid-item'>HTML</li>
      <li className='techs__grid-item'>CSS</li>
      <li className='techs__grid-item'>JS</li>
      <li className='techs__grid-item'>React</li>
      <li className='techs__grid-item'>Git</li>
      <li className='techs__grid-item'>Express.js</li>
      <li className='techs__grid-item'>mongoDB</li>
    </ul>
  </section>
);

export default Techs;
