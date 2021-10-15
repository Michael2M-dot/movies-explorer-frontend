import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import userIcon from '../../images/icon__user.svg';

const Navigation = ({ isLoggedIn = false }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const isMain = useRouteMatch({ path: '/main', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });
  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: true });
  const isProfile = useRouteMatch({ path: '/saved-movies', exact: true });

  const navigationMenuStyle = `navigation__bar ${
    isBurgerMenuOpen && 'active'}`;
  const profileButtonStyle = `navigation__profile ${
    isProfile && 'active'
  }`;

  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <div className='navigation'>
      {(isMain && !isLoggedIn) && (
        <div className='navigation_page-main'>
          <NavLink className='navigation__page-main-link' to="/signup" > Регистрация</NavLink>
          <NavLink className='navigation__page-main-button' to="/signin">Войти</NavLink>
        </div>
      )}

      {(!isMain || isLoggedIn) && (
        <>
          <button
            type="button"
            className='navigation__burger'
            onClick={toggleMenu}
          >
            <span className={`navigation__burger_span ${isBurgerMenuOpen ? 'active' : ''}`} />
          </button>
          {isBurgerMenuOpen && (<div className='navigation__bar-cover' />)}
          <div className={navigationMenuStyle}>
            <nav className="navigation__menu">
              {isBurgerMenuOpen && (
                <NavLink className="navigation__menu-item" to='/main'>
                Главная
                </NavLink>)
              }
              <NavLink
                className={`navigation__menu-item
                ${isMovies && 'active'}`}
                to='/movies'
              >
                Фильмы
              </NavLink>
              <NavLink
                className={`navigation__menu-item
                ${isSavedMovies && 'active'}`}
                to='./saved-movies'
              >
                Сохранённые фильмы
              </NavLink>
            </nav>
            <NavLink
              className={profileButtonStyle}
              to='/profile'
            >
              <h3 className='navigation__profile-text'>Аккаунт</h3>
              <div className='navigation__profile-icon'>
                <img
                  className='navigation__profile-icon-pic'
                  src={userIcon}
                  alt="Иконка аккаунта пользователя"
                />
              </div>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
