import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const FormFooter = ({
  isLoggedIn = false,
  buttonText,
  isDisabled = false,
  footerText,
  endPoint,
  footerLink,
  buttonType,
  onClick,
  isEditProfile = false,
  infoMessage = '',
}) => {
  const isProfilePage = useRouteMatch({ path: '/profile', exact: true });

  const buttonStyle = `${!isProfilePage || isEditProfile
    ? `form-footer__button ${isDisabled && 'form-footer__button_disabled'}`
    : `form-footer__button ${isDisabled && 'form-footer__button_disabled'} form-footer__button_page-profile`
  }`;
  const buttonTextStyle = `form-footer__button-text ${
    isProfilePage && 'form-footer__button-text_page-profile'
  }`;
  const linkTextStyle = `form-footer__link ${
    isProfilePage && 'form-footer__link_page-profile'
  }`;
  const preloaderDotsStyle = `form-footer__preloader-dots ${
    isLoggedIn && 'jump'
  }`;

  return (
    <div className="form-footer__wrapper">
      {isProfilePage && (
        <span className='form-footer__errors'>
          {infoMessage || ''}
        </span>
      )}
      <button
        className={buttonStyle}
        type={buttonType || 'submit'}
        aria-label="Подтвердите действия пользователя"
        onClick={onClick}
        disabled={isDisabled}
      >
        <div className="form-footer__button-wrapper">
          <p className={buttonTextStyle}>
            {buttonText}
          </p>
          <div className={`form-footer__preloader
        ${isLoggedIn ? 'active' : ''}`}
          >
            <span className={preloaderDotsStyle}>.</span>
            <span className={preloaderDotsStyle}>.</span>
            <span className={preloaderDotsStyle}>.</span>
          </div>
        </div>
      </button>
      <div className="form-footer__footer">
        <p className="form-footer__text">{footerText}</p>
        <NavLink
          className={linkTextStyle}
          to={endPoint}
        >
          {footerLink}
        </NavLink>
      </div>
    </div>
  );
};

export default FormFooter;
