import React from 'react';
// import { Link } from 'react-router-dom';
import FormFooter from '../FormFooter/FormFooter';
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
      <FormFooter
      isLoggedIn={isLoggedIn}
      isDisabled={isDisabled}
      buttonText={buttonText}
      footerText={footerText}
      footerLink={footerLink}
      endPoint={endPoint}
      />
    </form>
  </section>
);

export default Form;
