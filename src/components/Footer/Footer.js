import React from 'react';
// import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
    <div className='footer__wrapper'>
      <p className='footer__copyright'>
        © {new Date().getFullYear()}
      </p>
      <ul className='footer__links'>
        <li className='footer__link'>Яндекс.Практикум</li>
        <li className='footer__link'>Github</li>
        <li className='footer__link'>Facebook</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
