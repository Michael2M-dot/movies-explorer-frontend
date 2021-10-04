import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FormFooter from '../FormFooter/FormFooter';
import CurrentUserContext from '../../context/CurrentUserContext';

// import { useRouteMatch } from 'react-router-dom';

const Form = ({
  name,
  onSubmit,
  onSignOut,
  children,
  isDisabled = true,
  buttonText,
  isLoggedIn = false,
  footerText,
  footerLink,
  endPoint,
  formTitle,
  buttonType,
  onButtonClick,
  isEditProfile,
}) => {
  const { infoMessage } = useContext(CurrentUserContext);

  const isProfilePage = useRouteMatch({ path: '/profile', exact: true });

  const formStyle = `auth-form__form ${
    isProfilePage && 'auth-form__form_page-profile'
  }`;
  const formTitleStyle = `auth-form__title ${
    isProfilePage && 'auth-form__title_page-profile'
  }`;

  return (
    <section className="auth-form">
      <h2 className={formTitleStyle}>
        {formTitle}
      </h2>
      <form
        className={formStyle}
        id={`${name}`}
        name={`${name}`}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div className="auth-form__wrapper">
          {children}
          {!isProfilePage && (
            <span className='auth-form__errors'>
              {infoMessage || ''}
            </span>
          )}
        </div>
        <FormFooter
          isLoggedIn={isLoggedIn}
          isDisabled={isDisabled}
          buttonType={buttonType}
          buttonText={buttonText}
          footerText={footerText}
          footerLink={footerLink}
          endPoint={endPoint}
          onClick={onButtonClick}
          onSignOut={onSignOut}
          isEditProfile={isEditProfile}
          infoMessage={infoMessage}
        />
      </form>
    </section>
  );
};

export default Form;
