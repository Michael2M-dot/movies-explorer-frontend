import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const FormFooter = ({
  buttonText,
  isFormValid,
  isSubmitted,
  footerText,
  endPoint,
  footerLink,
  onClick,
  onSignOut,
  isEditProfile = false,
  infoMessage = '',
}) => {
  const isProfilePage = useRouteMatch({ path: '/profile', exact: true });
  // булево значение для disable кнопки
  const buttonDisabledProfile = !isFormValid || isSubmitted;

  const buttonStyle = `${!isProfilePage || isEditProfile
    ? `form-footer__button ${buttonDisabledProfile && 'form-footer__button_disabled'}`
    : `form-footer__button ${buttonDisabledProfile && 'form-footer__button_disabled'} form-footer__button_page-profile`
  }`;

  const linkTextStyle = `form-footer__link ${
    isProfilePage && 'form-footer__link_page-profile'
  }`;
  const preloaderDotsStyle = `form-footer__preloader-dots ${
    isSubmitted && 'jump'
  }`;

  return (
    <div className="form-footer__wrapper">
      {isProfilePage && (
        <span className='form-footer__errors'>
          {infoMessage || ''}
        </span>
      )}
      {(isProfilePage && !isEditProfile) && (
        <button
          className={buttonStyle}
          type='button'
          aria-label="Подтвердите действия пользователя"
          onClick={onClick}
          disabled={buttonDisabledProfile || false}
        >
          <div className="form-footer__button-wrapper">
            <p className='form-footer__button-text form-footer__button-text_page-profile'>
              Редактировать
            </p>
          </div>
        </button>
      )}
      {(
        <button
          className={buttonStyle}
          type='submit'
          aria-label="Подтвердите действия пользователя"
          disabled={buttonDisabledProfile}
          hidden={!isEditProfile && isProfilePage}
        >
          <div className="form-footer__button-wrapper">
            <p className='form-footer__button-text '>
              {buttonText}
            </p>
            <div className={`form-footer__preloader
        ${isSubmitted ? 'active' : ''}`}
            >
              <span className={preloaderDotsStyle}>.</span>
              <span className={preloaderDotsStyle}>.</span>
              <span className={preloaderDotsStyle}>.</span>
            </div>
          </div>
        </button>
      )}

      {/* <button */}
      {/*  className={buttonStyle} */}
      {/*  type={buttonType || 'submit'} */}
      {/*  aria-label="Подтвердите действия пользователя" */}
      {/*  onClick={onClick} */}
      {/*  disabled={buttonDisabledProfile} */}
      {/* > */}
      {/*  <div className="form-footer__button-wrapper"> */}
      {/*    <p className={buttonTextStyle}> */}
      {/*      {buttonText} */}
      {/*    </p> */}
      {/*    <div className={`form-footer__preloader */}
      {/*  ${isSubmitted ? 'active' : ''}`} */}
      {/*    > */}
      {/*      <span className={preloaderDotsStyle}>.</span> */}
      {/*      <span className={preloaderDotsStyle}>.</span> */}
      {/*      <span className={preloaderDotsStyle}>.</span> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </button> */}
      <div className="form-footer__footer">
        <p className="form-footer__text">{footerText}</p>
        <NavLink
          className={linkTextStyle}
          onClick={onSignOut}
          to={endPoint}
        >
          {footerLink}
        </NavLink>
      </div>
    </div>
  );
};

export default FormFooter;
