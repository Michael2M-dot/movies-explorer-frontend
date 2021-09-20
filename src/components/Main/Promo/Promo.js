import React from 'react';
import { NavLink } from 'react-router-dom';

const Promo = () => (
  <section className='lead'>
    <div className='lead__pic'/>
    <div className='lead__wrapper'>
      <h1 className='lead__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <p className='lead__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <NavLink className='lead__link' to='/'>Узнать больше</NavLink>
    </div>
  </section>
);

export default Promo;
