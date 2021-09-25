import React from 'react';

const NavTab = () => (
  <ul className='nav-tab__list'>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Статичный сайт</h3>
      <a
        className='nav-tab__item-link'
        href='https://michael2m-dot.github.io/how-to-learn/index.html'
        target='_blank'
        rel="noopener norefferer noreferrer"
      />
    </li>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Адаптивный сайт</h3>
      <a
        className='nav-tab__item-link'
        href='https://michael2m-dot.github.io/russian-travel/index.html'
        target='_blank'
        rel='noopener norefferer'
      />
    </li>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Одностраничное приложение</h3>
      <a
        className='nav-tab__item-link'
         href='https://mmm.mesto.nomoredomains.monster'
         target='_blank'
         rel='noopener norefferer'
      />
    </li>
  </ul>
);

export default NavTab;
