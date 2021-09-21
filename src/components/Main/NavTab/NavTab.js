import React from 'react';

const NavTab = () => (
  <ul className='nav-tab__list'>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Статичный сайт</h3>
      <a className='nav-tab__item-link' href='' target='_blank' rel='noopener norefferer' />
    </li>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Адаптивный сайт</h3>
      <a className='nav-tab__item-link' href='' target='_blank' rel='noopener norefferer' />
    </li>
    <li className='nav-tab__item'>
      <h3 className='nav-tab__item-title'>Одностраничное приложение</h3>
      <a className='nav-tab__item-link' href='' target='_blank' rel='noopener norefferer' />
    </li>
  </ul>
);

export default NavTab;
