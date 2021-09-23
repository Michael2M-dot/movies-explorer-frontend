import React from 'react';
import { NavLink } from 'react-router-dom';

const FormFooter = ({
  isLoggedIn = false,
  buttonText,
  isDisabled = true,
  footerText,
  endPoint,
  footerLink,
}) => (
  <div className="form-footer__wrapper">
    <button
      className="form-footer__button"
      type="submit"
      aria-label="Подтвердите действия пользователя"
      disabled={isDisabled}
    >
      <div className="form-footer__button-wrapper">
        <p className="form-footer__button-text">
          {buttonText}
        </p>
        <div className={`form-footer__preloader
        ${isLoggedIn ? 'active' : ''}`}
        >
          <span className={`form-footer__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
          <span className={`form-footer__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
          <span className={`form-footer__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
        </div>
      </div>
    </button>
    <div className="form-footer__footer">
      <p className="form-footer__text">{footerText}</p>
      <NavLink className="form-footer__link" to={endPoint}>{footerLink}</NavLink>
    </div>
  </div>
)

export default FormFooter;
