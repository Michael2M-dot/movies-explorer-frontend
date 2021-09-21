import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import userIcon from '../../images/icon__user.svg';

const Navigation = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const isMain = useRouteMatch({ path: '/main', exact: true });
  // const isSignIn = useRouteMatch({ path: '/signin', exact: true });
  // const isSignUp = useRouteMatch({ path: '/signup', exact: true });
  //
  // const headerBarStyle = `header__bar
  //     ${isSignIn || isSignUp || isMain  ? 'header__elm_hidden' : ''}`;
  const navigationMenuStyle = `navigation__bar ${
    isBurgerMenuOpen ? 'active' : ''}`

  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <div className='navigation'>
      {isMain && (
        <div className='navigation_page-main'>
          <NavLink className='navigation__page-main-link' to="/signup" > Регистрация</NavLink>
          <NavLink className='navigation__page-main-button' to="/signin">Войти</NavLink>
        </div>
      )}

      {!isMain && (
        <>
          <button
            type="button"
            className='navigation__burger'
            onClick={toggleMenu}
          >
            <span className={`navigation__burger_span ${isBurgerMenuOpen ? 'active' : ''}`} />
          </button>
          <div className={navigationMenuStyle}>
            <nav className="navigation__menu">
              {isBurgerMenuOpen && (
                <NavLink className="navigation__menu-item" to='./main'>
                Главная
                </NavLink>)
              }
              <NavLink className="navigation__menu-item" to='./movies'>
                Фильмы
              </NavLink>
              <NavLink className="navigation__menu-item" to='./saved-movies'>
                Сохранённые фильмы
              </NavLink>
            </nav>
            <div className="navigation__profile">
              <h3 className="navigation__profile-text">Аккаунт</h3>
              <div className="navigation__profile-icon">
                <img className="navigation__profile-icon-pic" src={userIcon} alt="Иконка аккаунта пользователя" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
