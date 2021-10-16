import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Logo from '../../images/logo.svg';

const Header = ({ children }) => {
  const isSignIn = useRouteMatch({ path: '/signin', exact: true });
  const isSignUp = useRouteMatch({ path: '/signup', exact: true });
  const isMain = useRouteMatch({ path: '/', exact: true });

  const headerStyle = `header
      ${isSignIn || isSignUp ? 'header__vertical' : ''}
      ${isMain ? 'header_page-main' : ''}`;

  return (
    <header className={headerStyle}>
      <NavLink to="/">
        <img className="header__logo" src={Logo} alt="Логотип" />
      </NavLink>
      {children}
    </header>
  );
};

export default Header;
