import React from 'react';

const Portfolio = () => (
  <section className='portfolio'>
    <h2 className='portfolio__title'>Портфолио</h2>
    <ul className='portfolio__list'>
      <li className='portfolio__item'>
        <h3 className='portfolio__item-title'>Статичный сайт</h3>
        <a className='portfolio__item-link' href='' target='_blank' rel='noopener' />
      </li>
      <li className='portfolio__item'>
        <h3 className='portfolio__item-title'>Адаптивный сайт</h3>
        <a className='portfolio__item-link' href='' target='_blank' rel='noopener' />
      </li>
      <li className='portfolio__item'>
        <h3 className='portfolio__item-title'>Одностраничное приложение</h3>
        <a className='portfolio__item-link' href='' target='_blank' rel='noopener' />
      </li>
    </ul>
  </section>
);

export default Portfolio;
