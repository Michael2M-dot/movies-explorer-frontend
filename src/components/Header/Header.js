import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import userIcon from '../../images/icon__user.svg';

const Header = (
  isLoggedIn = false,
) => {
  console.log(isLoggedIn);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // const isMain = useRouteMatch({ path: "/", exact: true });

  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <header className={`header
      ${isLoggedIn ? 'header__vertical' : ''}`}
    >
      <NavLink to="/main">
        <img className="header__logo" src={Logo} alt="Логотип" />
      </NavLink>
      <div className={`header__bar
      ${isLoggedIn ? 'header__elm_hidden' : ''}`}
      >
        <nav className="header__menu">
          <p className="header__menu-item">
            Фильмы
          </p>
          <p className="header__menu-item">
            Сохранённые фильмы
          </p>
        </nav>
        <div className="header__profile">
          <h3 className="header__profile-text">Аккаунт</h3>
          <div className="header__profile-icon">
            <img className="header__profile-icon-pic" src={userIcon} alt="Иконка аккаунта пользователя" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="header__burger"
        onClick={toggleMenu}
      >
        <span className={`header__burger_span ${isBurgerMenuOpen ? 'active' : ''}`} />
      </button>
      <div className={`header__text
      ${!isLoggedIn ? 'header__elm_hidden' : ''}`}
      >
        Добро пожаловать!
      </div>
    </header>
  );
};

export default Header;
