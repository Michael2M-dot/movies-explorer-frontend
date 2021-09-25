import React from 'react';
import { NavLink } from 'react-router-dom';

const Promo = () => (
  <section className='promo'>
    <div className='promo__pic'/>
    <div className='promo__wrapper'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <NavLink className='promo__link' to='/'>Узнать больше</NavLink>
    </div>
  </section>
);

export default Promo;
