import React from 'react';

const AboutMe = () => (
  <section className='about-me'>
    <h2 className='about-me__title'>Студент</h2>
    <div className='about-me__grid-wrapper'>
      <div className='about-me__brief'>
        <h3 className='about-me__brief-title'>Михаил</h3>
        <p className='about-me__brief-subtitle'>Фронтенд-разработчик, 40 лет</p>
        <p className='about-me__brief-text'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <ul className='about-me__brief-links'>
          <li>
            <a className='about-me__brief-link' href='https://github.com/Michael2M-dot' target='_blank' rel="noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a className='about-me__brief-link' href='https://github.com/Michael2M-dot' target='_blank' rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className='about-me__photo' />
    </div>
  </section>
);

export default AboutMe;
