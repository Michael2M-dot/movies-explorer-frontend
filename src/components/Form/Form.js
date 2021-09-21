import React from 'react';
import { Link } from 'react-router-dom';
// import { useRouteMatch } from 'react-router-dom';

const Form = ({
  name,
  onSubmit,
  children,
  isDisabled = false,
  buttonText,
  isLoggedIn = false,
  footerText,
  footerLink,
  endPoint,
}) => (
  <section className="auth-form">
    {/* <div className={`header__text */}
    {/*  ${isSignIn || isSignUp ? 'header__text_visible' : ''} */}
    {/*  ${isMain ? 'header__elm_hidden' : ''}`} */}
    {/* > */}
    {/*  {initialText} */}
    {/* </div> */}
    <form
      className="auth-form__form"
      id={`${name}`}
      name={`${name}`}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div className="auth-form__wrapper">
        {children}
      </div>
      <div className="auth-form__wrapper">
        <button
          className="auth-form__button"
          type="submit"
          aria-label="Подтвердите ввод данных от пользователя"
          disabled={isDisabled}
        >
          <div className="auth-form__button-wrapper">
            <p className="auth-form__button-text">
              {buttonText}
            </p>
            <div className={`auth-form__preloader
        ${isLoggedIn ? 'active' : ''}`}
            >
              <span className={`auth-form__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
              <span className={`auth-form__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
              <span className={`auth-form__preloader-dots ${isLoggedIn ? 'jump' : ''}`}>.</span>
            </div>
          </div>
        </button>
        <div className="auth-form__footer">
          <p className="auth-form__text">{footerText}</p>
          <Link className="auth-form__link" to={endPoint}>{footerLink}</Link>
        </div>
      </div>
    </form>
  </section>
);

export default Form;
