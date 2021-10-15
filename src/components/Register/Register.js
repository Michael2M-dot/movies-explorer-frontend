import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormInputsValidate from '../../hooks/useForm';

const Register = ({
  onRegister,
  isSubmitted = false,
  infoMessage = '',
}) => {
  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !values.email || !values.password ) {
      return;
    }
    onRegister(values);
  };

  return (
    <>
      <Header/>
      <Form
        name='user-sign-up'
        buttonText={!isSubmitted ? 'Зарегистрироваться' : 'Идет регистрация'}
        formTitle='Добро пожаловать!'
        onSubmit={handleSubmit}
        footerText='Уже зарегистрированы?'
        footerLink='Войти'
        endPoint="/signin"
        isSubmitted={isSubmitted}
        isFormValid={isValid}
        infoMessage={infoMessage || ''}
      >
        <label className="auth-form__input">
          <Input
            type='text'
            id='name'
            name='name'
            input='Имя'
            title="Введите имя пользователя."
            required
            maxLength="40"
            minLength="2"
            value={values.name || ''}
            onChange={handleChange}
            errors={errors.name}
          />
        </label>
        <label className="auth-form__input">
          <Input
            type='email'
            id='email'
            name='email'
            input='E-mail'
            title="Введите адрес электронной почты"
            required
            minLength="2"
            onChange={handleChange}
            value={values.email || ''}
            errors={errors.email}
          />
        </label>
        <label className="auth-form__input">
          <Input
            type='password'
            id='password'
            name='password'
            input='Пароль'
            title='Пароль должен содержать не менее 8 символов (без пробелов): цифры и буквы латинского алфавита в верхнем (заглавные) и нижнем регистре (прописные) . А также может содержать символы: !@#$%&-_'
            required
            minLength="8"
            value={values.password || ''}
            onChange={handleChange}
            errors={errors.password}
          />
        </label>
      </Form>
    </>
  );
};

export default Register;
