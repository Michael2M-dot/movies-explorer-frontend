import React from 'react';

const Footer = () => (
  <footer className="footer">
    <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
    <div className='footer__wrapper'>
      <p className='footer__copyright'>
        © {new Date().getFullYear()}
      </p>
      <ul className='footer__links'>
        <a
          className='footer__link'
          href='https://practicum.yandex.ru'
          target='_blank'
          rel='noopener noreferrer'
        >
          Яндекс.Практикум
        </a>
        <a
          className='footer__link'
          href='https://github.com/Michael2M-dot'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
        <a
          className='footer__link'
          href='https://github.com/Michael2M-dot'
          target='_blank'
          rel='noopener noreferrer'
        >
          Facebook
        </a>
      </ul>
    </div>
  </footer>
);

export default Footer;
