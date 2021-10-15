import React from 'react';

const AboutMe = () => (
  <section className='about-me'>
    <h2 className='about-me__title'>Студент</h2>
    <div className='about-me__grid-wrapper'>
      <div className='about-me__brief'>
        <h3 className='about-me__brief-title'>Михаил</h3>
        <p className='about-me__brief-subtitle'>Начинающий Фронтенд-разработчик, 40 лет</p>
        <p className='about-me__brief-text'> В веб-разработке привлекает возможность реализовать свой жизненный опыт,
          свои навыки и умения. Рассматриваю веб-разработку, как огромное пространство для творчества и самореализации.
          Считаю, что написание чистого и простого, а главное работающего кода - это отдельный вид искусства.
          Увлекаюсь масштабным моделированием военной техники из пластика. Люблю читать книги о финансах,
          психологии человеческих отношений, о ведении бизнеса. Увлекаюсь рыбалкой, в основном на ”мирную” рыбу.
        </p>
        <ul className='about-me__brief-links'>
          <li>
            <a
              className='about-me__brief-link'
              href='https://github.com/Michael2M-dot'
              target='_blank'
              rel='noreferrer nooppener'
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              className='about-me__brief-link'
              href='https://github.com/Michael2M-dot'
              target='_blank'
              rel='noreferrer nooppener'
            >
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
