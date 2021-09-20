import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Main = () => (
<>
  <Header />
  <main className='content'>
    <section className='lead content__section'>
      <div className='lead__pic'/>
      <div className='lead__wrapper'>
        <h1 className='lead__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='lead__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <NavLink className='lead__link' to='/'>Узнать больше</NavLink>
      </div>
    </section>
    <section className='intro content__section'>
      <div className='intro__container'>
      </div>
    </section>
    <section className='technology content__section'>

    </section>
    <section className='about content__section'>

    </section>
  </main>
  <Footer />
</>
);

export default Main;
