import React, { useState } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Input/Input';

const Register = ({
  isSubmitted = false,
}) => {
  const [isLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Header
        isLoggedIn={isLoggedIn}
      />
      <Form
        name='user-sign-up'
        buttonText={!isSubmitted ? 'Зарегистрироваться' : 'Идет регистрация'}
        onSubmit={handleSubmit}
        footerText='Уже зарегистрированы?'
        footerLink='Войти'
        endPoint="/signin"
      >
        <label className="auth-form__input">
          <Input
            inputName='Имя'
            type='text'
          />
        </label>
        <label className="auth-form__input">
          <Input
            inputName='E-mail'
            type='url'
          />
        </label>
        <label className="auth-form__input">
          <Input
            inputName='Пароль'
            type='password'
          />
        </label>
      </Form>
    </>
  );
};

export default Register;
