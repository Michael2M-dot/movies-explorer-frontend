import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormInputsValidate from '../../hooks/useForm';
import { REGEX_PASSWORD } from '../../utils/REG_EX';

const Login = ({
  isSubmitted,
  onLogin,
}) => {
  const {
    values,
    errors,
    isValid = false,
    handleChange,
    resetForm,
  } = useFormInputsValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <>
      <Header/>
      <Form
        name='user-sign-in'
        buttonText={!isSubmitted ? 'Войти' : 'Выполняется вход'}
        formTitle='Рады видеть!'
        onSubmit={handleSubmit}
        footerText='Еще не зарегистрированные?'
        footerLink='Регистрация'
        endPoint="/signup"
        isFormValid={isValid}
        isSubmitted={isSubmitted}
      >
        <label className="auth-form__input">
          <Input
            type='email'
            id='email'
            name='email'
            input='E-mail'
            title="Введите адрес электронной почты"
            minLength="2"
            required
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
            minLength="8"
            pattern={REGEX_PASSWORD}
            required
            onChange={handleChange}
            value={values.password || ''}
            errors={errors.password}
          />
        </label>
      </Form>
    </>
  );
};

export default Login;
