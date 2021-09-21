import React, { useState } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Input/Input';

const Login = ({
  isSubmitted = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Header/>
      <Form
        name='user-sign-in'
        buttonText={!isSubmitted ? 'Войти' : 'Выполняется вход'}
        onSubmit={handleSubmit}
        footerText='Еще не зарегистрированные?'
        footerLink='Регистрация'
        endPoint="/signup"
      >
        <label className="auth-form__input">
          <Input
          name='E-mail'
          />
        </label>
        <label className="auth-form__input">
          <Input
            name='Пароль'
            type='password'
          />
        </label>
      </Form>
    </>
  );
};

export default Login;
