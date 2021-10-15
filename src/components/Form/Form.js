import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FormFooter from '../FormFooter/FormFooter';
import CurrentUserContext from '../../context/CurrentUserContext';

const Form = ({
  children,
  name,
  buttonText,
  footerText,
  footerLink,
  endPoint,
  formTitle,
  onSubmit,
  onSignOut,
  onUpdateUser,
  onButtonClick,
  isEditProfile,
  isSubmitted = false,
  isFormValid,
  isDisabled = true,
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
          endPoint={endPoint}
          buttonText={buttonText}
          footerText={footerText}
          footerLink={footerLink}
          onClick={onButtonClick}
          onSignOut={onSignOut}
          onUpdateUser={onUpdateUser}
          infoMessage={infoMessage}
          isEditProfile={isEditProfile}
          isSubmitted={isSubmitted}
          isDisabled={isDisabled}
          isFormValid={isFormValid}
        />
      </form>
    </section>
  );
};

export default Form;
