import React from 'react';
import { NavLink } from 'react-router-dom';

const Page404 = () => (
  <div className='page_page-404'>
    <section className='page-404'>
      <div className='page-404__wrapper'>
        <h1 className='page-404__title'>404</h1>
        <p className='page-404__text'>Страница не найдена</p>
      </div>
      <NavLink className='page-404__link' to='/'>Назад</NavLink>
    </section>

  </div>
);

export default Page404;
